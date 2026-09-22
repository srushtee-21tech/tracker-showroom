import { Request, Response, NextFunction } from 'express';
import Showroom from '../models/Showroom';
import { isMongoConnected } from '../config/db';
import { inMemoryStore } from '../store/inMemoryStore';
import { IShowroom } from '../types';

export const getShowrooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, search } = req.query;

    if (isMongoConnected) {
      let query: any = {};
      if (city) {
        query.city = { $regex: city as string, $options: 'i' };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search as string, $options: 'i' } },
          { locationName: { $regex: search as string, $options: 'i' } },
          { city: { $regex: search as string, $options: 'i' } },
          { address: { $regex: search as string, $options: 'i' } },
        ];
      }
      const showrooms = await Showroom.find(query).sort({ isFlagship: -1, name: 1 });
      return res.json({ success: true, count: showrooms.length, data: showrooms });
    } else {
      let list = [...inMemoryStore.showrooms];

      if (city) {
        list = list.filter((s) => s.city.toLowerCase().includes((city as string).toLowerCase()));
      }
      if (search) {
        const q = (search as string).toLowerCase();
        list = list.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.locationName.toLowerCase().includes(q) ||
            s.city.toLowerCase().includes(q) ||
            s.address.toLowerCase().includes(q)
        );
      }
      list.sort((a, b) => (b.isFlagship ? 1 : 0) - (a.isFlagship ? 1 : 0));
      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (error) {
    next(error);
  }
};

export const getShowroomById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const showroom = await Showroom.findById(id);
      if (!showroom) return res.status(404).json({ message: 'Showroom not found.' });
      return res.json({ success: true, data: showroom });
    } else {
      const showroom = inMemoryStore.showrooms.find((s) => s._id === id);
      if (!showroom) return res.status(404).json({ message: 'Showroom not found.' });
      return res.json({ success: true, data: showroom });
    }
  } catch (error) {
    next(error);
  }
};

export const createShowroom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const showroomData = req.body;
    const now = new Date().toISOString();

    if (isMongoConnected) {
      const newShowroom = await Showroom.create(showroomData);
      return res.status(201).json({ success: true, data: newShowroom });
    } else {
      const newShowroom: IShowroom = {
        _id: 'show-' + Date.now(),
        ...showroomData,
        createdAt: now,
        updatedAt: now,
      };
      inMemoryStore.showrooms.unshift(newShowroom);
      return res.status(201).json({ success: true, data: newShowroom });
    }
  } catch (error) {
    next(error);
  }
};

export const updateShowroom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const now = new Date().toISOString();

    if (isMongoConnected) {
      const updated = await Showroom.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) return res.status(404).json({ message: 'Showroom not found.' });
      return res.json({ success: true, data: updated });
    } else {
      const index = inMemoryStore.showrooms.findIndex((s) => s._id === id);
      if (index === -1) return res.status(404).json({ message: 'Showroom not found.' });
      inMemoryStore.showrooms[index] = {
        ...inMemoryStore.showrooms[index],
        ...updates,
        updatedAt: now,
      };
      return res.json({ success: true, data: inMemoryStore.showrooms[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteShowroom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deleted = await Showroom.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Showroom not found.' });
      return res.json({ success: true, message: 'Showroom deleted successfully.' });
    } else {
      const index = inMemoryStore.showrooms.findIndex((s) => s._id === id);
      if (index === -1) return res.status(404).json({ message: 'Showroom not found.' });
      inMemoryStore.showrooms.splice(index, 1);
      return res.json({ success: true, message: 'Showroom deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};

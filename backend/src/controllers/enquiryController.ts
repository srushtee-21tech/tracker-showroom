import { Request, Response, NextFunction } from 'express';
import Enquiry from '../models/Enquiry';
import { isMongoConnected } from '../config/db';
import { inMemoryStore } from '../store/inMemoryStore';
import { IEnquiry } from '../types';

export const createEnquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      customerName,
      email,
      phone,
      companyName,
      enquiryType,
      productRef,
      productName,
      showroomRef,
      showroomName,
      preferredDate,
      message,
    } = req.body;

    if (!customerName || !email || !phone || !message) {
      return res.status(400).json({ message: 'Name, email, phone, and message are required.' });
    }

    const now = new Date().toISOString();
    const enquiryData = {
      customerName,
      email,
      phone,
      companyName: companyName || '',
      enquiryType: enquiryType || 'Sales Inquiry',
      productRef: productRef || '',
      productName: productName || '',
      showroomRef: showroomRef || '',
      showroomName: showroomName || '',
      preferredDate: preferredDate || '',
      message,
      status: 'New',
      internalNotes: '',
    };

    if (isMongoConnected) {
      const newEnquiry = await Enquiry.create(enquiryData);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your enquiry. A showroom representative will contact you shortly.',
        data: newEnquiry,
      });
    } else {
      const newEnquiry: IEnquiry = {
        _id: 'enq-' + Date.now(),
        ...enquiryData,
        status: 'New',
        createdAt: now,
        updatedAt: now,
      };
      inMemoryStore.enquiries.unshift(newEnquiry);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your enquiry. A showroom representative will contact you shortly.',
        data: newEnquiry,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getEnquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, type } = req.query;

    if (isMongoConnected) {
      let query: any = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (type && type !== 'All') {
        query.enquiryType = type;
      }
      const list = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    } else {
      let list = [...inMemoryStore.enquiries];
      if (status && status !== 'All') {
        list = list.filter((e) => e.status === status);
      }
      if (type && type !== 'All') {
        list = list.filter((e) => e.enquiryType === type);
      }
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;
    const now = new Date().toISOString();

    if (isMongoConnected) {
      const updated = await Enquiry.findByIdAndUpdate(
        id,
        { status, internalNotes, updatedAt: now },
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: 'Enquiry not found.' });
      return res.json({ success: true, data: updated });
    } else {
      const index = inMemoryStore.enquiries.findIndex((e) => e._id === id);
      if (index === -1) return res.status(404).json({ message: 'Enquiry not found.' });
      inMemoryStore.enquiries[index] = {
        ...inMemoryStore.enquiries[index],
        status: status || inMemoryStore.enquiries[index].status,
        internalNotes: internalNotes !== undefined ? internalNotes : inMemoryStore.enquiries[index].internalNotes,
        updatedAt: now,
      };
      return res.json({ success: true, data: inMemoryStore.enquiries[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Enquiry not found.' });
      return res.json({ success: true, message: 'Enquiry deleted.' });
    } else {
      const index = inMemoryStore.enquiries.findIndex((e) => e._id === id);
      if (index === -1) return res.status(404).json({ message: 'Enquiry not found.' });
      inMemoryStore.enquiries.splice(index, 1);
      return res.json({ success: true, message: 'Enquiry deleted.' });
    }
  } catch (error) {
    next(error);
  }
};

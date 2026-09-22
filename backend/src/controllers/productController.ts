import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { isMongoConnected } from '../config/db';
import { inMemoryStore } from '../store/inMemoryStore';
import { IProduct } from '../types';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, featured, inStock, sortBy } = req.query;

    if (isMongoConnected) {
      let query: any = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      if (inStock === 'true') {
        query.inStock = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search as string, $options: 'i' } },
          { modelNumber: { $regex: search as string, $options: 'i' } },
          { description: { $regex: search as string, $options: 'i' } },
        ];
      }

      let sortOption: any = { createdAt: -1 };
      if (sortBy === 'price-low') sortOption = { price: 1 };
      if (sortBy === 'price-high') sortOption = { price: -1 };
      if (sortBy === 'rating') sortOption = { rating: -1 };

      const products = await Product.find(query).sort(sortOption);
      return res.json({ success: true, count: products.length, data: products });
    } else {
      let list = [...inMemoryStore.products];

      if (category && category !== 'All') {
        list = list.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        list = list.filter((p) => p.isFeatured);
      }
      if (inStock === 'true') {
        list = list.filter((p) => p.inStock);
      }
      if (search) {
        const q = (search as string).toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.modelNumber.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
      else list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return res.json({ success: true, count: list.length, data: list });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      return res.json({ success: true, data: product });
    } else {
      const product = inMemoryStore.products.find((p) => p._id === id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      return res.json({ success: true, data: product });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;
    const now = new Date().toISOString();

    if (isMongoConnected) {
      const newProduct = await Product.create(productData);
      return res.status(201).json({ success: true, data: newProduct });
    } else {
      const newProduct: IProduct = {
        _id: 'prod-' + Date.now(),
        ...productData,
        createdAt: now,
        updatedAt: now,
      };
      inMemoryStore.products.unshift(newProduct);
      return res.status(201).json({ success: true, data: newProduct });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const now = new Date().toISOString();

    if (isMongoConnected) {
      const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) return res.status(404).json({ message: 'Product not found.' });
      return res.json({ success: true, data: updated });
    } else {
      const index = inMemoryStore.products.findIndex((p) => p._id === id);
      if (index === -1) return res.status(404).json({ message: 'Product not found.' });
      inMemoryStore.products[index] = {
        ...inMemoryStore.products[index],
        ...updates,
        updatedAt: now,
      };
      return res.json({ success: true, data: inMemoryStore.products[index] });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Product not found.' });
      return res.json({ success: true, message: 'Product deleted successfully.' });
    } else {
      const index = inMemoryStore.products.findIndex((p) => p._id === id);
      if (index === -1) return res.status(404).json({ message: 'Product not found.' });
      inMemoryStore.products.splice(index, 1);
      return res.json({ success: true, message: 'Product deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};

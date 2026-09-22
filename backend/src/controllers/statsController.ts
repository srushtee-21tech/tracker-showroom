import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Showroom from '../models/Showroom';
import Enquiry from '../models/Enquiry';
import { isMongoConnected } from '../config/db';
import { inMemoryStore } from '../store/inMemoryStore';

export const getAdminStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isMongoConnected) {
      const totalProducts = await Product.countDocuments();
      const totalShowrooms = await Showroom.countDocuments();
      const totalEnquiries = await Enquiry.countDocuments();
      const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
      const activeProducts = await Product.countDocuments({ inStock: true });
      const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

      return res.json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          totalShowrooms,
          totalEnquiries,
          newEnquiries,
          recentEnquiries,
        },
      });
    } else {
      const totalProducts = inMemoryStore.products.length;
      const activeProducts = inMemoryStore.products.filter((p) => p.inStock).length;
      const totalShowrooms = inMemoryStore.showrooms.length;
      const totalEnquiries = inMemoryStore.enquiries.length;
      const newEnquiries = inMemoryStore.enquiries.filter((e) => e.status === 'New').length;
      const recentEnquiries = [...inMemoryStore.enquiries]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      return res.json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          totalShowrooms,
          totalEnquiries,
          newEnquiries,
          recentEnquiries,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

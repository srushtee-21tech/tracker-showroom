import { Request, Response } from 'express';
import { inMemoryStore } from '../store/inMemoryStore';

export const getGallery = async (req: Request, res: Response) => {
  const { category } = req.query;
  let items = [...inMemoryStore.gallery];
  if (category && category !== 'All') {
    items = items.filter((g) => g.category === category);
  }
  return res.json({
    success: true,
    data: items,
  });
};

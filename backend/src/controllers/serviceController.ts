import { Request, Response } from 'express';
import { inMemoryStore } from '../store/inMemoryStore';

export const getServices = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: inMemoryStore.services,
  });
};

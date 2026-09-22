import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types/index.js';

export interface IProductDocument extends Omit<IProduct, '_id'>, Document {}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    modelNumber: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Fleet Trackers', 'OBD Trackers', 'Asset Trackers', 'Personal Trackers', 'Motorbike Trackers', 'Accessories'],
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [{ type: String }],
    specifications: {
      batteryLife: { type: String, default: 'Internal Backup / Continuous Power' },
      dimensions: { type: String, default: 'Compact / Ergonomic Build' },
      weight: { type: String, default: 'Lightweight Enterprise Grade' },
      network: { type: String, default: '4G LTE Multi-band / 2G Fallback' },
      gpsAccuracy: { type: String, default: '< 2.5m CEP' },
      waterproofRating: { type: String, default: 'IP67 Waterproof' },
      geoFenceSupport: { type: Boolean, default: true },
      updateInterval: { type: String, default: '5 to 60 seconds adjustable' },
    },
    keyFeatures: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 24 },
  },
  { timestamps: true }
);

ProductSchema.index({ title: 'text', modelNumber: 'text', description: 'text' });

export default mongoose.model<IProductDocument>('Product', ProductSchema);

import mongoose, { Schema, Document } from 'mongoose';
import { IShowroom } from '../types/index.js';

export interface IShowroomDocument extends Omit<IShowroom, '_id'>, Document {}

const ShowroomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    locationName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    openingHours: {
      weekdays: { type: String, default: '09:00 AM - 07:00 PM' },
      saturday: { type: String, default: '10:00 AM - 05:00 PM' },
      sunday: { type: String, default: 'Closed / Appointment Only' },
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    googleMapEmbedUrl: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Renovating', 'Coming Soon'], default: 'Open' },
    isFlagship: { type: Boolean, default: false },
    images: [{ type: String }],
    servicesOffered: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IShowroomDocument>('Showroom', ShowroomSchema);

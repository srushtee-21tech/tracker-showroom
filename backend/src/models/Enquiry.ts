import mongoose, { Schema, Document } from 'mongoose';
import { IEnquiry } from '../types/index.js';

export interface IEnquiryDocument extends Omit<IEnquiry, '_id'>, Document {}

const EnquirySchema: Schema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    enquiryType: {
      type: String,
      required: true,
      enum: ['Sales Inquiry', 'Book Live Demo', 'Technical Support', 'Installation Request', 'Showroom Visit'],
    },
    productRef: { type: String },
    productName: { type: String },
    showroomRef: { type: String },
    showroomName: { type: String },
    preferredDate: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Contacted', 'Closed'],
      default: 'New',
    },
    internalNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IEnquiryDocument>('Enquiry', EnquirySchema);

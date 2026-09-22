import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/index.js';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>('User', UserSchema);

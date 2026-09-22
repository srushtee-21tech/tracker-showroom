import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Showroom from '../models/Showroom.js';
import Enquiry from '../models/Enquiry.js';
import { inMemoryStore } from '../store/inMemoryStore.js';

dotenv.config();

const seed = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trackershowroom';
  console.log('[Seed] Connecting to MongoDB...');

  try {
    await mongoose.connect(mongoURI);
    console.log('[Seed] Connected successfully.');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Showroom.deleteMany({});
    await Enquiry.deleteMany({});

    console.log('[Seed] Cleared existing data.');

    // Seed Admin
    const defaultPasswordHash = bcrypt.hashSync('Admin@123456', 10);
    await User.create({
      name: 'Showroom System Administrator',
      email: 'admin@trackershowroom.com',
      passwordHash: defaultPasswordHash,
      role: 'admin',
    });

    // Seed Products
    const productsToSeed = inMemoryStore.products.map(({ _id, ...rest }) => rest);
    await Product.insertMany(productsToSeed);

    // Seed Showrooms
    const showroomsToSeed = inMemoryStore.showrooms.map(({ _id, ...rest }) => rest);
    await Showroom.insertMany(showroomsToSeed);

    // Seed Enquiries
    const enquiriesToSeed = inMemoryStore.enquiries.map(({ _id, ...rest }) => rest);
    await Enquiry.insertMany(enquiriesToSeed);

    console.log('✅ [Seed Success] Initialized Admin User, Products, Showrooms, and Enquiries in MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ [Seed Error]', err);
    process.exit(1);
  }
};

seed();

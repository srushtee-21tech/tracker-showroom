import mongoose from 'mongoose';

export let isMongoConnected = false;

export const connectDB = async (): Promise<boolean> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trackershowroom';
  
  try {
    mongoose.set('strictQuery', false);
    // Timeout quickly (3s) if MongoDB server isn't running locally so fallback works fast
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    console.log(`[Database] Connected to MongoDB: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database] Could not connect to MongoDB at ${mongoURI}.`);
    console.warn(`[Database] Falling back to built-in In-Memory Hybrid Data Engine.`);
    return false;
  }
};

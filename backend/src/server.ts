import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDB, isMongoConnected } from './config/db';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import showroomRoutes from './routes/showroomRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import serviceRoutes from './routes/serviceRoutes';
import galleryRoutes from './routes/galleryRoutes';
import statsRoutes from './routes/statsRoutes';

dotenv.config();

const app = express();
export default app;
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(
  cors({
    origin: CORS_ORIGIN === '*' ? '*' : CORS_ORIGIN.split(','),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    databaseMode: isMongoConnected ? 'MongoDB Live' : 'In-Memory Engine Active',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/showrooms', showroomRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/stats', statsRoutes);

// Optional Monolith Production Static File Serving (if deployed together)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Error Handler Middleware
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Tracker Showroom Backend API Running on Port ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💾 Database Engine Mode: ${isMongoConnected ? 'MongoDB Live' : 'In-Memory Engine Active'}`);
    console.log(`====================================================`);
  });
};

if (process.env.NODE_ENV !== 'production') {
  startServer();
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorHandler_1 = require("./middleware/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const showroomRoutes_1 = __importDefault(require("./routes/showroomRoutes"));
const enquiryRoutes_1 = __importDefault(require("./routes/enquiryRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const galleryRoutes_1 = __importDefault(require("./routes/galleryRoutes"));
const statsRoutes_1 = __importDefault(require("./routes/statsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        databaseMode: db_1.isMongoConnected ? 'MongoDB Live' : 'In-Memory Engine Active',
        environment: process.env.NODE_ENV || 'development',
    });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/showrooms', showroomRoutes_1.default);
app.use('/api/enquiries', enquiryRoutes_1.default);
app.use('/api/services', serviceRoutes_1.default);
app.use('/api/gallery', galleryRoutes_1.default);
app.use('/api/stats', statsRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🚀 Tracker Showroom Backend API Running on Port ${PORT}`);
        console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
        console.log(`💾 Database Engine Mode: ${db_1.isMongoConnected ? 'MongoDB Live' : 'In-Memory Engine Active'}`);
        console.log(`====================================================`);
    });
};
startServer();

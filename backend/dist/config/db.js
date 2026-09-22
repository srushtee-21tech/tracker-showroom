"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.isMongoConnected = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.isMongoConnected = false;
const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trackershowroom';
    try {
        mongoose_1.default.set('strictQuery', false);
        // Timeout quickly (3s) if MongoDB server isn't running locally so fallback works fast
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 3000,
        });
        exports.isMongoConnected = true;
        console.log(`[Database] Connected to MongoDB: ${mongoose_1.default.connection.host}`);
        return true;
    }
    catch (error) {
        exports.isMongoConnected = false;
        console.warn(`[Database] Could not connect to MongoDB at ${mongoURI}.`);
        console.warn(`[Database] Falling back to built-in In-Memory Hybrid Data Engine.`);
        return false;
    }
};
exports.connectDB = connectDB;

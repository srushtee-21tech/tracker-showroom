"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_js_1 = __importDefault(require("../models/User.js"));
const Product_js_1 = __importDefault(require("../models/Product.js"));
const Showroom_js_1 = __importDefault(require("../models/Showroom.js"));
const Enquiry_js_1 = __importDefault(require("../models/Enquiry.js"));
const inMemoryStore_js_1 = require("../store/inMemoryStore.js");
dotenv_1.default.config();
const seed = async () => {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trackershowroom';
    console.log('[Seed] Connecting to MongoDB...');
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log('[Seed] Connected successfully.');
        await User_js_1.default.deleteMany({});
        await Product_js_1.default.deleteMany({});
        await Showroom_js_1.default.deleteMany({});
        await Enquiry_js_1.default.deleteMany({});
        console.log('[Seed] Cleared existing data.');
        // Seed Admin
        const defaultPasswordHash = bcryptjs_1.default.hashSync('Admin@123456', 10);
        await User_js_1.default.create({
            name: 'Showroom System Administrator',
            email: 'admin@trackershowroom.com',
            passwordHash: defaultPasswordHash,
            role: 'admin',
        });
        // Seed Products
        const productsToSeed = inMemoryStore_js_1.inMemoryStore.products.map(({ _id, ...rest }) => rest);
        await Product_js_1.default.insertMany(productsToSeed);
        // Seed Showrooms
        const showroomsToSeed = inMemoryStore_js_1.inMemoryStore.showrooms.map(({ _id, ...rest }) => rest);
        await Showroom_js_1.default.insertMany(showroomsToSeed);
        // Seed Enquiries
        const enquiriesToSeed = inMemoryStore_js_1.inMemoryStore.enquiries.map(({ _id, ...rest }) => rest);
        await Enquiry_js_1.default.insertMany(enquiriesToSeed);
        console.log('✅ [Seed Success] Initialized Admin User, Products, Showrooms, and Enquiries in MongoDB.');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ [Seed Error]', err);
        process.exit(1);
    }
};
seed();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStats = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Showroom_1 = __importDefault(require("../models/Showroom"));
const Enquiry_1 = __importDefault(require("../models/Enquiry"));
const db_1 = require("../config/db");
const inMemoryStore_1 = require("../store/inMemoryStore");
const getAdminStats = async (req, res, next) => {
    try {
        if (db_1.isMongoConnected) {
            const totalProducts = await Product_1.default.countDocuments();
            const totalShowrooms = await Showroom_1.default.countDocuments();
            const totalEnquiries = await Enquiry_1.default.countDocuments();
            const newEnquiries = await Enquiry_1.default.countDocuments({ status: 'New' });
            const activeProducts = await Product_1.default.countDocuments({ inStock: true });
            const recentEnquiries = await Enquiry_1.default.find().sort({ createdAt: -1 }).limit(5);
            return res.json({
                success: true,
                data: {
                    totalProducts,
                    activeProducts,
                    totalShowrooms,
                    totalEnquiries,
                    newEnquiries,
                    recentEnquiries,
                },
            });
        }
        else {
            const totalProducts = inMemoryStore_1.inMemoryStore.products.length;
            const activeProducts = inMemoryStore_1.inMemoryStore.products.filter((p) => p.inStock).length;
            const totalShowrooms = inMemoryStore_1.inMemoryStore.showrooms.length;
            const totalEnquiries = inMemoryStore_1.inMemoryStore.enquiries.length;
            const newEnquiries = inMemoryStore_1.inMemoryStore.enquiries.filter((e) => e.status === 'New').length;
            const recentEnquiries = [...inMemoryStore_1.inMemoryStore.enquiries]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5);
            return res.json({
                success: true,
                data: {
                    totalProducts,
                    activeProducts,
                    totalShowrooms,
                    totalEnquiries,
                    newEnquiries,
                    recentEnquiries,
                },
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAdminStats = getAdminStats;

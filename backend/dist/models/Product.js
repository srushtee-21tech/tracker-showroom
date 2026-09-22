"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    modelNumber: { type: String, required: true, unique: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['Fleet Trackers', 'OBD Trackers', 'Asset Trackers', 'Personal Trackers', 'Motorbike Trackers', 'Accessories'],
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [{ type: String }],
    specifications: {
        batteryLife: { type: String, default: 'Internal Backup / Continuous Power' },
        dimensions: { type: String, default: 'Compact / Ergonomic Build' },
        weight: { type: String, default: 'Lightweight Enterprise Grade' },
        network: { type: String, default: '4G LTE Multi-band / 2G Fallback' },
        gpsAccuracy: { type: String, default: '< 2.5m CEP' },
        waterproofRating: { type: String, default: 'IP67 Waterproof' },
        geoFenceSupport: { type: Boolean, default: true },
        updateInterval: { type: String, default: '5 to 60 seconds adjustable' },
    },
    keyFeatures: [{ type: String }],
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 24 },
}, { timestamps: true });
ProductSchema.index({ title: 'text', modelNumber: 'text', description: 'text' });
exports.default = mongoose_1.default.model('Product', ProductSchema);

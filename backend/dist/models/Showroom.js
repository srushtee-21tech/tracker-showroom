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
const ShowroomSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    locationName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    openingHours: {
        weekdays: { type: String, default: '09:00 AM - 07:00 PM' },
        saturday: { type: String, default: '10:00 AM - 05:00 PM' },
        sunday: { type: String, default: 'Closed / Appointment Only' },
    },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    googleMapEmbedUrl: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Renovating', 'Coming Soon'], default: 'Open' },
    isFlagship: { type: Boolean, default: false },
    images: [{ type: String }],
    servicesOffered: [{ type: String }],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Showroom', ShowroomSchema);

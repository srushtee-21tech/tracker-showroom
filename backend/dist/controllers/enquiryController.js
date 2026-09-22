"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnquiry = exports.updateEnquiryStatus = exports.getEnquiries = exports.createEnquiry = void 0;
const Enquiry_1 = __importDefault(require("../models/Enquiry"));
const db_1 = require("../config/db");
const inMemoryStore_1 = require("../store/inMemoryStore");
const createEnquiry = async (req, res, next) => {
    try {
        const { customerName, email, phone, companyName, enquiryType, productRef, productName, showroomRef, showroomName, preferredDate, message, } = req.body;
        if (!customerName || !email || !phone || !message) {
            return res.status(400).json({ message: 'Name, email, phone, and message are required.' });
        }
        const now = new Date().toISOString();
        const enquiryData = {
            customerName,
            email,
            phone,
            companyName: companyName || '',
            enquiryType: enquiryType || 'Sales Inquiry',
            productRef: productRef || '',
            productName: productName || '',
            showroomRef: showroomRef || '',
            showroomName: showroomName || '',
            preferredDate: preferredDate || '',
            message,
            status: 'New',
            internalNotes: '',
        };
        if (db_1.isMongoConnected) {
            const newEnquiry = await Enquiry_1.default.create(enquiryData);
            return res.status(201).json({
                success: true,
                message: 'Thank you for your enquiry. A showroom representative will contact you shortly.',
                data: newEnquiry,
            });
        }
        else {
            const newEnquiry = {
                _id: 'enq-' + Date.now(),
                ...enquiryData,
                status: 'New',
                createdAt: now,
                updatedAt: now,
            };
            inMemoryStore_1.inMemoryStore.enquiries.unshift(newEnquiry);
            return res.status(201).json({
                success: true,
                message: 'Thank you for your enquiry. A showroom representative will contact you shortly.',
                data: newEnquiry,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createEnquiry = createEnquiry;
const getEnquiries = async (req, res, next) => {
    try {
        const { status, type } = req.query;
        if (db_1.isMongoConnected) {
            let query = {};
            if (status && status !== 'All') {
                query.status = status;
            }
            if (type && type !== 'All') {
                query.enquiryType = type;
            }
            const list = await Enquiry_1.default.find(query).sort({ createdAt: -1 });
            return res.json({ success: true, count: list.length, data: list });
        }
        else {
            let list = [...inMemoryStore_1.inMemoryStore.enquiries];
            if (status && status !== 'All') {
                list = list.filter((e) => e.status === status);
            }
            if (type && type !== 'All') {
                list = list.filter((e) => e.enquiryType === type);
            }
            list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return res.json({ success: true, count: list.length, data: list });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getEnquiries = getEnquiries;
const updateEnquiryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, internalNotes } = req.body;
        const now = new Date().toISOString();
        if (db_1.isMongoConnected) {
            const updated = await Enquiry_1.default.findByIdAndUpdate(id, { status, internalNotes, updatedAt: now }, { new: true });
            if (!updated)
                return res.status(404).json({ message: 'Enquiry not found.' });
            return res.json({ success: true, data: updated });
        }
        else {
            const index = inMemoryStore_1.inMemoryStore.enquiries.findIndex((e) => e._id === id);
            if (index === -1)
                return res.status(404).json({ message: 'Enquiry not found.' });
            inMemoryStore_1.inMemoryStore.enquiries[index] = {
                ...inMemoryStore_1.inMemoryStore.enquiries[index],
                status: status || inMemoryStore_1.inMemoryStore.enquiries[index].status,
                internalNotes: internalNotes !== undefined ? internalNotes : inMemoryStore_1.inMemoryStore.enquiries[index].internalNotes,
                updatedAt: now,
            };
            return res.json({ success: true, data: inMemoryStore_1.inMemoryStore.enquiries[index] });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateEnquiryStatus = updateEnquiryStatus;
const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (db_1.isMongoConnected) {
            const deleted = await Enquiry_1.default.findByIdAndDelete(id);
            if (!deleted)
                return res.status(404).json({ message: 'Enquiry not found.' });
            return res.json({ success: true, message: 'Enquiry deleted.' });
        }
        else {
            const index = inMemoryStore_1.inMemoryStore.enquiries.findIndex((e) => e._id === id);
            if (index === -1)
                return res.status(404).json({ message: 'Enquiry not found.' });
            inMemoryStore_1.inMemoryStore.enquiries.splice(index, 1);
            return res.json({ success: true, message: 'Enquiry deleted.' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEnquiry = deleteEnquiry;

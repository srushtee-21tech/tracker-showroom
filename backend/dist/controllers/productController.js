"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const db_1 = require("../config/db");
const inMemoryStore_1 = require("../store/inMemoryStore");
const getProducts = async (req, res, next) => {
    try {
        const { category, search, featured, inStock, sortBy } = req.query;
        if (db_1.isMongoConnected) {
            let query = {};
            if (category && category !== 'All') {
                query.category = category;
            }
            if (featured === 'true') {
                query.isFeatured = true;
            }
            if (inStock === 'true') {
                query.inStock = true;
            }
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { modelNumber: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ];
            }
            let sortOption = { createdAt: -1 };
            if (sortBy === 'price-low')
                sortOption = { price: 1 };
            if (sortBy === 'price-high')
                sortOption = { price: -1 };
            if (sortBy === 'rating')
                sortOption = { rating: -1 };
            const products = await Product_1.default.find(query).sort(sortOption);
            return res.json({ success: true, count: products.length, data: products });
        }
        else {
            let list = [...inMemoryStore_1.inMemoryStore.products];
            if (category && category !== 'All') {
                list = list.filter((p) => p.category === category);
            }
            if (featured === 'true') {
                list = list.filter((p) => p.isFeatured);
            }
            if (inStock === 'true') {
                list = list.filter((p) => p.inStock);
            }
            if (search) {
                const q = search.toLowerCase();
                list = list.filter((p) => p.title.toLowerCase().includes(q) ||
                    p.modelNumber.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q));
            }
            if (sortBy === 'price-low')
                list.sort((a, b) => a.price - b.price);
            else if (sortBy === 'price-high')
                list.sort((a, b) => b.price - a.price);
            else if (sortBy === 'rating')
                list.sort((a, b) => b.rating - a.rating);
            else
                list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return res.json({ success: true, count: list.length, data: list });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (db_1.isMongoConnected) {
            const product = await Product_1.default.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            return res.json({ success: true, data: product });
        }
        else {
            const product = inMemoryStore_1.inMemoryStore.products.find((p) => p._id === id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            return res.json({ success: true, data: product });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const now = new Date().toISOString();
        if (db_1.isMongoConnected) {
            const newProduct = await Product_1.default.create(productData);
            return res.status(201).json({ success: true, data: newProduct });
        }
        else {
            const newProduct = {
                _id: 'prod-' + Date.now(),
                ...productData,
                createdAt: now,
                updatedAt: now,
            };
            inMemoryStore_1.inMemoryStore.products.unshift(newProduct);
            return res.status(201).json({ success: true, data: newProduct });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const now = new Date().toISOString();
        if (db_1.isMongoConnected) {
            const updated = await Product_1.default.findByIdAndUpdate(id, updates, { new: true });
            if (!updated)
                return res.status(404).json({ message: 'Product not found.' });
            return res.json({ success: true, data: updated });
        }
        else {
            const index = inMemoryStore_1.inMemoryStore.products.findIndex((p) => p._id === id);
            if (index === -1)
                return res.status(404).json({ message: 'Product not found.' });
            inMemoryStore_1.inMemoryStore.products[index] = {
                ...inMemoryStore_1.inMemoryStore.products[index],
                ...updates,
                updatedAt: now,
            };
            return res.json({ success: true, data: inMemoryStore_1.inMemoryStore.products[index] });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (db_1.isMongoConnected) {
            const deleted = await Product_1.default.findByIdAndDelete(id);
            if (!deleted)
                return res.status(404).json({ message: 'Product not found.' });
            return res.json({ success: true, message: 'Product deleted successfully.' });
        }
        else {
            const index = inMemoryStore_1.inMemoryStore.products.findIndex((p) => p._id === id);
            if (index === -1)
                return res.status(404).json({ message: 'Product not found.' });
            inMemoryStore_1.inMemoryStore.products.splice(index, 1);
            return res.json({ success: true, message: 'Product deleted successfully.' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;

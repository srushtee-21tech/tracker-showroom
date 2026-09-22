"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGallery = void 0;
const inMemoryStore_1 = require("../store/inMemoryStore");
const getGallery = async (req, res) => {
    const { category } = req.query;
    let items = [...inMemoryStore_1.inMemoryStore.gallery];
    if (category && category !== 'All') {
        items = items.filter((g) => g.category === category);
    }
    return res.json({
        success: true,
        data: items,
    });
};
exports.getGallery = getGallery;

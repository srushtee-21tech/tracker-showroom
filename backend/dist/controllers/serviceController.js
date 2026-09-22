"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = void 0;
const inMemoryStore_1 = require("../store/inMemoryStore");
const getServices = async (req, res) => {
    return res.json({
        success: true,
        data: inMemoryStore_1.inMemoryStore.services,
    });
};
exports.getServices = getServices;

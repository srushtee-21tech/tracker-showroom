"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMe = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const db_1 = require("../config/db");
const inMemoryStore_1 = require("../store/inMemoryStore");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        let userObj = null;
        if (db_1.isMongoConnected) {
            const foundUser = await User_1.default.findOne({ email: email.toLowerCase().trim() });
            if (foundUser) {
                userObj = {
                    id: foundUser._id.toString(),
                    name: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role,
                    passwordHash: foundUser.passwordHash,
                };
            }
        }
        else {
            const foundUser = inMemoryStore_1.inMemoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
            if (foundUser) {
                userObj = {
                    id: foundUser._id,
                    name: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role,
                    passwordHash: foundUser.passwordHash,
                };
            }
        }
        if (!userObj) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, userObj.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const secret = process.env.JWT_SECRET || 'tracker_showroom_super_secret_jwt_key_2026!';
        const token = jsonwebtoken_1.default.sign({ id: userObj.id, email: userObj.email, role: userObj.role }, secret, { expiresIn: '1d' });
        return res.json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: userObj.id,
                name: userObj.name,
                email: userObj.email,
                role: userObj.role,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const verifyMe = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    return res.json({
        success: true,
        user: req.user,
    });
};
exports.verifyMe = verifyMe;

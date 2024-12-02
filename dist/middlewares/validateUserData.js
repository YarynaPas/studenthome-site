"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
const validateUserData = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
    }
    else {
        next();
    }
};
exports.validateUserData = validateUserData;

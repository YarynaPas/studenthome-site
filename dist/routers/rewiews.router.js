"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rewiew_controller_1 = require("../controllers/rewiew.controller");
const reviewRouter = (0, express_1.Router)();
exports.reviewRouter = reviewRouter;
reviewRouter.post('/', auth_middleware_1.authenticateUser, rewiew_controller_1.leaveReview);

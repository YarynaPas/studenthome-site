"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
        console.error(`Error [${statusCode}]: ${message}`);
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static unauthorized(message) {
        return new ApiError(401, message);
    }
    static forbidden(message) {
        return new ApiError(403, message);
    }
    static notFound(message) {
        return new ApiError(404, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
}
exports.ApiError = ApiError;

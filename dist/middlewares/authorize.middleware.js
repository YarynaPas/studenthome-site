"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== requiredRole) {
            res.status(403).json({ message: 'Недостатньо прав для виконання цієї дії' });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;

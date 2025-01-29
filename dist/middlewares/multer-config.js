"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const slugify_1 = __importDefault(require("slugify"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, '../../uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Формуємо ім'я файлу зі slugify
        const originalFileName = path_1.default.parse(file.originalname).name; // Отримуємо ім'я без розширення
        const extension = path_1.default.extname(file.originalname); // Отримуємо розширення
        const safeFileName = `${(0, slugify_1.default)(originalFileName, {
            replacement: '-', // Заміна пробілів на тире
            lower: true, // Імена файлів у нижньому регістрі
            strict: true, // Видалення недопустимих символів
            locale: 'uk', // Підтримка української мови
        })}${extension}`;
        cb(null, safeFileName);
    },
});
// Фільтрація файлів за типом (опціонально)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Unsupported file type'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // Максимальний розмір файлу — 10MB
    },
});
exports.upload = upload;

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import slugify from 'slugify';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {

        // Формуємо ім'я файлу зі slugify
        const originalFileName = path.parse(file.originalname).name; // Отримуємо ім'я без розширення
        const extension = path.extname(file.originalname); // Отримуємо розширення
        const safeFileName = `${slugify(originalFileName, {
            replacement: '-', // Заміна пробілів на тире
            lower: true, // Імена файлів у нижньому регістрі
            strict: true, // Видалення недопустимих символів
            locale: 'uk', // Підтримка української мови
        })}${extension}`;

        cb(null, safeFileName);
    },
});

// Фільтрація файлів за типом (опціонально)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // Максимальний розмір файлу — 10MB
    },
});

export { upload };

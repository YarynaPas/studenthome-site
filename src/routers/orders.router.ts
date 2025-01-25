import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware';
import {
    getOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrderStatus,
    getOrdersByStatus,
    downloadFile
} from '../controllers/order.controller';
import multer from "multer";
import {attachFileToOrder} from "../controllers/manager.controller";


const orderRouter = Router();

orderRouter.get('/', authenticateUser, getOrders);
orderRouter.get('/:id', authenticateUser, getOrderById);
orderRouter.post('/', authenticateUser, createOrder);
orderRouter.delete('/:id', authenticateUser, deleteOrder);
orderRouter.get('/status', authenticateUser, getOrdersByStatus);
orderRouter.put('/:id/status', authenticateUser, updateOrderStatus);

const upload = multer({ dest: "uploads/" });

orderRouter.put(
    "/:id/attach-file",
    upload.single("file"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const file = req.file;

            if (!file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            await attachFileToOrder(id, file);
            res.status(200).json({ message: "File attached successfully" });
        } catch (error) {
            next(error);
        }
    }
);

orderRouter.get("/:id/download", async (req, res, next) => {
    try {
        await downloadFile(req, res);
    } catch (error) {
        next(error);
    }
});
export { orderRouter };

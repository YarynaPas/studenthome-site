import { Router } from 'express';
import multer from 'multer';
import {
    attachFileToOrder,
    getOrders,
    updatePrice,
    updateStatus,
    updatePaymentStatus, downloadFile
} from '../controllers/manager.controller';
import { authorizeAdmin } from '../middlewares/authorize.middleware';
import { RoleTypeEnum } from '../enum/role-type-enum';

const adminRouter = Router();

adminRouter.get(
    '/orders',
    authorizeAdmin([RoleTypeEnum.Admin]),
    async (req, res, next) => {
        try {
            const orders = await getOrders(req, res, next);
            if (!res.headersSent) {
                res.status(200).json(orders);
            }
        } catch (error) {
            next(error);
        }
    }
);

adminRouter.put(
    '/orders/:id/price',
    authorizeAdmin([RoleTypeEnum.Admin]),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { cost } = req.body;
            await updatePrice(id, cost);
            if (!res.headersSent) {
                res.status(200).json({ message: 'Price updated successfully' });
            }
        } catch (error) {
            next(error);
        }
    }
);

adminRouter.put(
    '/orders/:id/status',
    authorizeAdmin([RoleTypeEnum.Admin]),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await updateStatus(id, status);
            if (!res.headersSent) {
                res.status(200).json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            next(error);
        }
    }
);

adminRouter.put(
    '/orders/:id/payment-status',
    authorizeAdmin([RoleTypeEnum.Admin]),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { payment_status } = req.body;
            await updatePaymentStatus(id, payment_status);
            if (!res.headersSent) {
                res.status(200).json({ message: 'Payment status updated successfully' });
            }
        } catch (error) {
            next(error);
        }
    }
);

const upload = multer({ dest: "uploads/" });

adminRouter.put(
    "/orders/:id/attach-file",
    authorizeAdmin([RoleTypeEnum.Admin]),
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

adminRouter.get("/orders/:id/download", async (req, res, next) => {
    try {
        await downloadFile(req, res);
    } catch (error) {
        next(error);
    }
}
);

export { adminRouter };

import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routers/user.router';
import configs from './config/config';
import { ApiError } from './errors/api-error';
import authRouter from './routers/auth.router';
import { orderRouter } from './routers/orders.router';
import cors from 'cors';
import {reviewRouter} from "./routers/rewiews.router";
import {adminRouter} from "./routers/admin.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use('/reviews', reviewRouter)
app.use('*', (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode || 500).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error.message, error.stack);
    process.exit(1);
});

const port = configs.APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

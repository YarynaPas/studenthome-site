import express, {NextFunction, Request, Response} from 'express';
import {userRouter} from './routers/user.router';
import configs from './config/config';
import {ApiError} from './errors/api-error';
import authRouter from './routers/auth.router';
import {carRouter} from "./routers/car.router";
import {advertisingViewRouter} from "./routers/advertising.router";
import {managerRouter} from "./routers/manager.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('stats', advertisingViewRouter );
app.use('/manager', managerRouter);

app.use(
    '*',
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            res.status(err.statusCode || 500).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
);

process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error.message, error.stack);
    process.exit(1);
});

const port = configs.APP_PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

import { Request } from 'express';
import { OrderAttributes } from '../models/order.model';

export interface FileRequest extends Request {
    file?: Express.Multer.File;
    order?: OrderAttributes;
}

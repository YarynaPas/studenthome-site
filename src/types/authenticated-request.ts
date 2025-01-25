import { Request } from 'express';
import { UserAttributes } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
    user?: UserAttributes;
}

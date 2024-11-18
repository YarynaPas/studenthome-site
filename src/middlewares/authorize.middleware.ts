import {Request, Response, NextFunction} from 'express';
import {RoleTypeEnum} from '../enum/role-type-enum';

export const authorizeRole = (requiredRole: RoleTypeEnum) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if ((req as any).user?.role !== requiredRole) {
            res.status(403).json({message: 'Недостатньо прав для виконання цієї дії'});
            return;
        }
        next();
    };
};

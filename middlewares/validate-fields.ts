import { validationResult } from 'express-validator'; 
import { NextFunction, Request, Response } from 'express';

export default function validateFields (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult( req ); 
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: 'Bad request', 
            errors: errors.mapped()
        });
    } 

    next();
}

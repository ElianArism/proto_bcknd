import { Request, Response, NextFunction } from 'express';
import { AdminModel } from '../models/Admin';

export default async function emailExists(req: Request, res: Response, next: NextFunction) {
    const {email} = req.body; 
    const emailExists = await AdminModel.findOne({email});

    if(emailExists) {
        return res.status(400).json({
            ok: false,
            msg: 'Bad request, el correo ingresado ya esta registrado'
        });
    }

    next();
}
import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import enviromentVars from '../enviroment.vars';

export default function validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false, 
            msg: 'Unauthorized Request, token no encontrado'
        });
    }

    try {
        const { payload }: any = jwt.verify(token, enviromentVars.SECRET_KEY);
        req.headers['id'] = payload;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false, 
            msg: 'Unauthorized Request, token invalido', 
            logs: error
        }); 
    }
}
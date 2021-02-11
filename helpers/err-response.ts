import { Response } from 'express';

export default function errResponse(msg: string, type: number, res: Response, err: any) {
    return res.status(type).json({
        ok: false,
        msg: `${msg}`, err
    });
}
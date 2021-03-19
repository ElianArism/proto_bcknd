import {Response} from 'express';

export default function internalSvError(res: Response, error: any): Response {
    console.log(error)
    return res.status(500).json({
        ok: false,
        msg: 'Ocurrio un error, logs: ', 
        error
    });   
}
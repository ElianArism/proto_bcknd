import { Request, Response } from "express";
import errResponse from "../helpers/err-response";
import internalSvError from "../helpers/internal-sv-response";

import { ClothesModel } from "../models/Clothes";
import enviromentVars from "../enviroment.vars";

const mercadopago = require('mercadopago');

export const getProductTopay = async (req: Request, res: Response) => {
    const id = req.params.id;  

    mercadopago.configure({
        client_id: enviromentVars.MERCADOPAGO_CLIENT_ID,
        client_secret: enviromentVars.MERCADOPAGO_CLIENT_SECRET,
        access_token: enviromentVars.MERCADOPAGO_API_KEY_PROD
    });

    try {

        const clothesDB = await
            ClothesModel
                .findById(id)
                .populate('type', 'type')
                .populate('brand', 'name')
                .populate('sizes', 'size stock');
        
        
        if(!clothesDB) {
            errResponse('No se encontro una prenda con ese id', 404, res, null); 
        }

        let preference = {
            "binary_mode": true,
            "statement_descriptor": "FZINDUMENTARIA",
            "back_urls": {
                "success": `http://localhost:4200/home/clothes/sold/${id}`, 
                "failure": `http://localhost:4200/home/clothes/failure/${id}`
                // "success": `https://app-fz.herokuapp.com/home/clothes/sold/${id}`, 
                // "failure": `https://app-fz.herokuapp.com/home/clothes/failure/${id}`
                
            },
            items: [
                {
                    "currency_id": "ARS",
                    "picture_url": clothesDB.img.path,
                    title: clothesDB.name, 
                    unit_price: clothesDB.price,
                    quantity: 1,   
                    "purpose": "wallet_purchase",
                }
            ]
        }

        mercadopago.preferences.create(preference)
            .then((response:any) => {
                
                return res.json({
                    ok: true,
                    global_id: response.body.id, 
                    clothesDB
                });
                
            })
            .catch((err:any) => {
                console.log(err);
                internalSvError(res, err); 
            });

    } catch (error) {
        internalSvError(res, error);
    }
}
import { Request, Response } from "express";
import errResponse from "../helpers/err-response";
import internalSvError from "../helpers/internal-sv-response";

import { ClothesModel, IClothes } from "../models/Clothes";
import enviromentVars from "../enviroment.vars";

const mercadopago = require('mercadopago');

export const getProductTopay = async (req: Request, res: Response) => {
    const id = req.params.id; 

    mercadopago.configure({
        access_token: enviromentVars.MERCADOPAGO_API_KEY,
    });

    try {

        const clothesDB: IClothes = await ClothesModel
            .findById(id)
            .populate('type', 'type')
            .populate('brand', 'name')
            .populate('sizes', 'size avaible')

        if(!clothesDB) {
            errResponse('No se encontro una prenda con ese id', 404, res, null); 
        }

        let preference = {
            items: [
                {
                    title: clothesDB.name, 
                    unit_price: clothesDB.price,
                    quantity: 1
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
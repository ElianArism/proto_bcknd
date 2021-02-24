import { Request, Response } from "express";
import { ClothesModel } from "../models/Clothes";
import { TypeModel } from "../models/Type";
import internalSvError  from "../helpers/internal-sv-response";
import  errResponse from "../helpers/err-response";
import { BrandModel } from "../models/Brand";

let search: string = ''; 

export const searchEngineGeneral = async (req: Request, res: Response) => {
    search = req.params.search; 
    
    const regExp: RegExp = new RegExp(search, 'i');

    try {
        const clothesDB = await ClothesModel
                    .find({name: regExp})
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible');
            
        const typesDB = await TypeModel.find({type: regExp});

        const clothesAndTypesDB = await ClothesModel
                    .find({type: typesDB[0]})
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible');
                
        const brandDB = await BrandModel.find({name: regExp});
        
        const clothesAndBrandsDB = await ClothesModel
                    .find({brand: brandDB[0]})
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible');
                
        
        if(!clothesDB && !clothesAndTypesDB && !clothesAndTypesDB) errResponse('No se encontraron resultados', 404, res, null);

        return res.json({
            ok: true, 
            res: {
                clothesDB, 
                clothesAndTypesDB,
                clothesAndBrandsDB
            }
        });
        
    } catch (error) {internalSvError(res, error);}
}

// export const searchEngineSpecific = async (req: Request, res: Response) => {
//     search = req.params.search; 
//     const table = req.params.table; 
//     const regExp: RegExp = new RegExp(search, 'i');
//     let response; 

//     try {
//         switch(table) {
//             case 'brand': 
//                 response = await BrandModel.find({name: regExp});
//             break; 
//             case 'clothes' = await ClothesModel.find({name:''})
//         }    
//     } catch (error) {internalSvError(res, error);}   
// }
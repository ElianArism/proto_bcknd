import { Request, Response } from "express";
import { ClothesModel } from "../models/Clothes";
import { IType, TypeModel } from "../models/Type";
import internalSvError  from "../helpers/internal-sv-response";
import  errResponse from "../helpers/err-response";
import { BrandModel, IBrand } from "../models/Brand";

export const searchEngineGeneral = async (req: Request, res: Response) => {
    const search = req.params.search; 
    
    const regExp: RegExp = new RegExp(search, 'i');

    try {
        const typesDB = await TypeModel.find({type: regExp});
        const brandDB = await BrandModel.find({name: regExp});
        
        const [clothesDB, clothesAndTypesDB, clothesAndBrandsDB] = await Promise.all([
            ClothesModel
                .find({name: regExp})
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible'),
            ClothesModel
                .find({type: typesDB[0]})
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible'),
            ClothesModel
                .find({brand: brandDB[0]})
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible')
        ]);

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
export const searchEngine4Sex = async (req: Request, res: Response) => {
    const search = req.params.search;
    const since = req.query.since; 
    const sex: any = req.query.sex; 
    const regExp: RegExp = new RegExp(search, 'i');

    try {
        const typesDB = await TypeModel.find({type: regExp});
        const brandDB = await BrandModel.find({name: regExp});

        const [clothesDB, clothesAndTypesDB, clothesAndBrandsDB] = await Promise.all([
            ClothesModel
                .find({name: regExp, gender: [sex]})
                .skip(Number(since))
                .limit(7)
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible'),
            ClothesModel
                .find({type: typesDB[0], gender: [sex]})
                .skip(Number(since))
                .limit(7)
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible'),
            ClothesModel
                .find({brand: brandDB[0], gender: [sex]})
                .skip(Number(since))
                .limit(7)
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate('sizes', 'size avaible')
        ]);

        let total;

        if(clothesDB.length > 0) {
            total = await ClothesModel.count({name: regExp, gender: [sex]});
        } else if (clothesAndTypesDB.length > 0) {
            total = await ClothesModel.count({type: typesDB[0], gender: [sex]}); 
        } else if (clothesAndBrandsDB.length > 0) {
            total = await ClothesModel.count({brand: brandDB[0], gender: [sex]});
        } else {
            errResponse('No se encontraron resultados', 404, res, null);
        }
        

        return res.json({
            ok: true, 
            res: {
                clothesDB, 
                clothesAndTypesDB,
                clothesAndBrandsDB, 
                total
            }
        });
        
    } catch (error) {internalSvError(res, error);}
}

export const filterEngine = async (req: Request, res: Response) => {
    let brand: any = req.query.brands; 
    let type: any = req.query.types;

    const brandRegex = brand ? new RegExp(brand, 'i') : null;
    const typeRegex = type ? new RegExp(type, 'i') : null;

    let typesDB: IType[] = [];
    let brandsDB: IBrand[] = [];
    let clothesDB; 

    try {
        if(typeRegex) {
            typesDB = await TypeModel.find({type: typeRegex});
        }
        if(brandRegex) {
            brandsDB = await BrandModel.find({name: brandRegex});
        }        

        if(typesDB.length > 0 && brandsDB.length > 0) {
            clothesDB = await ClothesModel
                .find({type: typesDB[0]._id, brand: brandsDB[0]._id})
                .populate('brand', 'name')
                .populate('type', 'type sex')
                .populate('sizes', 'size avaible');
        
        } else if(brandsDB.length > 0) {
            clothesDB = await ClothesModel
                .find({brand: brandsDB[0]._id})
                .populate('brand', 'name')
                .populate('type', 'type sex')
                .populate('sizes', 'size avaible');

        } else if(typesDB.length > 0) {
            clothesDB = await ClothesModel
                .find({type: typesDB[0]._id})
                .populate('brand', 'name')
                .populate('type', 'type sex')
                .populate('sizes', 'size avaible');   
        } else {
            internalSvError(res, null);
        }
         
        if(!clothesDB) errResponse('No se encontraron resultados', 404, res, null);

        return res.json({
            ok: true, 
            res: clothesDB
        });
        
    } catch (error) {internalSvError(res, error);}

}

export const filterEngine4Sex = async (req: Request, res: Response) => {
    const sex = req.params.sex;
    const brand: any = req.query.brands; 
    const type: any = req.query.types;
    const since: any = req.query.since; 
    
    const brandRegex = brand ? new RegExp(brand, 'i') : null;
    const typeRegex = type ? new RegExp(type, 'i') : null;

    let typesDB: IType[] = [];
    let brandsDB: IBrand[] = [];
    let clothesDB;
    let totalClothes; 

    try {
        if(typeRegex) {
            typesDB = await TypeModel.find({type: typeRegex});
        }
        if(brandRegex) {
            brandsDB = await BrandModel.find({name: brandRegex});
        }        

        if(typesDB.length > 0 && brandsDB.length > 0) {
            
            [clothesDB, totalClothes] = await Promise.all([

                ClothesModel
                    .find({type: typesDB[0]._id, brand: brandsDB[0]._id, gender: [sex], active: true})
                    .limit(7)
                    .skip(Number(since))
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible'),
                    ClothesModel.count({type: typesDB[0]._id, brand: brandsDB[0]._id, gender: [sex], active: true})
            ]);
        
        } else if(brandsDB.length > 0) {
            
            [clothesDB, totalClothes] = await Promise.all([

                ClothesModel
                    .find({brand: brandsDB[0]._id, gender: [sex], active: true})
                    .limit(7)
                    .skip(Number(since))
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible'),
                    ClothesModel.count({brand: brandsDB[0]._id, gender: [sex], active: true})
            ]);
            

        } else if(typesDB.length > 0) {
        
            [clothesDB, totalClothes] = await Promise.all([

                ClothesModel
                    .find({type: typesDB[0]._id, gender: [sex], active: true})
                    .limit(7)
                    .skip(Number(since))
                    .populate('brand', 'name')
                    .populate('type', 'type sex')
                    .populate('sizes', 'size avaible'),
                    ClothesModel.count({type: typesDB[0]._id, gender: [sex], active: true})
            ]);
            
        } else {
            internalSvError(res, null);
        }
         
        if(!clothesDB) errResponse('No se encontraron resultados', 404, res, null);

        return res.json({
            ok: true, 
            clothesDB,
            totalClothes    
        });
        
    } catch (error) {internalSvError(res, error);}
}
import { Request, Response } from 'express';
import { IClothes, ClothesModel } from '../models/Clothes';
import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';

export const addClothes = async (req: Request, res: Response) => {

    const newClothes: IClothes = new ClothesModel(req.body); 
    
    try {
        const clothesBD = await newClothes.save();

        return res.json({
            ok: true, 
            clothesBD
        });

    } catch (error) { internalSvError(res, error); }
}

export const updateClothes = async (req: Request, res: Response) => {
    const data: IClothes = req.body;
    const id: string = req.params.id;

    const clothes = await ClothesModel.findById(id);
    
    if(!clothes) {
        return errResponse('No se encontro ropa con ese id', 404, res, null);
    } else {
        try {
            const clothesUpdate: IClothes =  await ClothesModel.findByIdAndUpdate(id, data, {new: true});
            
            return res.json({
                ok: true, 
                clothesUpdate
            });
    
        } catch (error) { internalSvError(res, error); }            
    }
}

export const getClothes = async (req: Request, res: Response) => {
    const since = Number(req.query.since) || 0; 
    const until = 7;
    try {
        const [clothes, total] = await Promise.all([
            ClothesModel
                .find()
                .skip(since) 
                .limit(until)
                .populate('brand', 'name')
                .populate('type', 'type sex')
                .populate('sizes', 'size avaible'), 
            ClothesModel.count()
        ]);

        return res.json({
            ok: true, 
            clothes, 
            total
        });

    } catch (error) { internalSvError(res, error); }
}

export const getOne = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const clothesDB = await 
            ClothesModel
                .findById(id)
                .populate('brand', 'name')
                .populate('type', 'type sex')
                .populate('sizes', 'size avaible')
        
        if(!clothesDB) {
            errResponse('No se encontro la prenda', 404, res, null);
        }

        return res.json({
            ok: true,
            clothesDB
        });
        
    } catch (error) { internalSvError(res, error); }
}

export const deactivateOrActivateClothes = async (req: Request, res: Response) => {
    const id: string = req.params.id; 

    const clothes: IClothes = await ClothesModel.findById(id);
    
    if(!clothes) {
        return errResponse('No se encontro ropa con ese id', 404, res, null);
    } else {

        clothes.active = (clothes.active) ? false : true; 
        
        try {
            const clothesDeleted: IClothes = await ClothesModel.findByIdAndUpdate(id, clothes, {new: true});
            
            return res.json({
                ok: true, 
                clothesDeleted
            }); 
    
        } catch (error) { internalSvError(res, error); }
    }
}   

export const deleteClothes = async (req: Request, res: Response) => {
    const id: string = req.params.id; 
    const clothes: IClothes = await ClothesModel.findById(id);
    
    if(!clothes) {
        return errResponse('No se encontro ropa con ese id', 404, res, null);
    } else {
        try {
            const clothesDeleted: IClothes = await ClothesModel.findByIdAndDelete(id);
    
            return res.json({
                ok: true, 
                clothesDeleted
            });
        } catch (error) { internalSvError(res, error); }
    }
}
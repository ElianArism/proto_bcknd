import { Request, Response } from 'express';
import { IClothes, ClothesModel } from '../models/Clothes';
import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';

export const addClothes = async (req: Request, res: Response) => {

    const newClothes: IClothes = new ClothesModel(req.body); 
    
    try {
        let i = 0;
        newClothes.sizes.forEach(size => {
            if(size.stock > 0) {
                i++; 
            }
        });
        if(i <= 0) newClothes.active = false;  

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
    let clothes;
    try {
      clothes = await ClothesModel.findById(id);
        
    } catch (error) { internalSvError(res, error) }
    
    if(!clothes) {
        return errResponse('No se encontro ropa con ese id', 404, res, null);
    } else {
        try {
            let i = 0;
            data.sizes.forEach(size => {
                if(Number(size.stock) > 0) {
                    i = i + 1; 
                }
            });
            if(i <= 0) {
                data.active = false;
            }

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
                .populate('type', 'type')
                .populate({path:'sizes', populate:{path: 'size'}}),
            ClothesModel.countDocuments()
        ]);

        return res.json({
            ok: true, 
            clothes, 
            total
        });
 
    } catch (error) { internalSvError(res, error); }
}

export const getClothes4Sex = async (req: Request, res: Response) => {
    const sex = req.params.sex; 
    const since = Number(req.query.since) || 0; 
    const until = 7; 
    try {
        let clothesDB; 
        let total;

        [clothesDB, total] = await Promise.all([
            ClothesModel
                .find({gender: [sex], active: true})
                .skip(since) 
                .limit(until)
                .populate('brand', 'name')
                .populate('type', 'type')
                .populate({path:'sizes', populate:{path: 'size'}}),
                
            ClothesModel    
                .countDocuments({gender: [sex], active: true})
        ]);
        
        return res.json({
            ok: true, 
            clothesDB, 
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
            .populate('type', 'type')
            .populate({path:'sizes', populate:{path: 'size'}})
    
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

export const setStock = async (req: Request, res: Response) => {
    const id = req.params.id; 
    const {stock, size} = req.body;
    try {
        const clothesDB = await 
            ClothesModel.findById(id)
                .populate({path:'sizes', populate:{path: 'size'}}); 
        
        clothesDB.sizes = clothesDB.sizes.map((currentSize: any) => {
            if(currentSize.size.size === size) {
                currentSize.stock = stock; 
            }
            return currentSize; 
        });

        
        const updateClothesDB = await ClothesModel.findByIdAndUpdate(id, clothesDB, {new: true}); 
        return res.json({
            ok: true, 
            updateClothesDB
        });
    } catch (error) { internalSvError(res, error); }
}
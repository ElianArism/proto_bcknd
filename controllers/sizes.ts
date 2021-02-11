import { ISize, SizeModel } from '../models/Size';
import { Request, Response} from 'express';

import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';

export const addSizes = async (req: Request, res: Response) => {
    let {size, avaible} = req.body;
    size = size.charAt(0).toUpperCase(); 
    
    try {
        const sizeExist = await SizeModel.findOne({size});
        
        if(sizeExist) {
            return errResponse('Ya existe este talle', 401, res, null);
        }
        
        const newSize: ISize = new SizeModel({size, avaible}); 
        const sizeBD = await newSize.save();        
        
        return res.json({
            ok: true, 
            sizeBD
        }); 

    } catch (error) { internalSvError(res, error); }
}

export const updateSizes = async (req: Request, res: Response) => {
    const data: ISize = req.body; 
    const id: string = req.params.id;
    try {
        const size: ISize = await SizeModel.findById(id);
        
        if(!size) {
            return errResponse('No se encuentra talle con ese id', 404, res, null);
        } else {
            const sizeUpdated: ISize = await SizeModel.findByIdAndUpdate(id, data, {new: true});
                
            return res.json({
                ok: true, 
                sizeUpdated
            });
        }
    } catch (error) { internalSvError(res, error); }
}

export const getSizes = async (req: Request, res: Response) => {
    try {
        const sizes: ISize[] = await SizeModel.find();

        return res.json({
            ok: true, 
            sizes
        });

    } catch (error) { internalSvError(res, error); }
}

export  const deleteSizes = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const size: ISize = await SizeModel.findById(id); 

    if(!size) {
        return errResponse('No existe talle con ese id', 404, res, null);
    } else {
        try {
            const sizeDeleted: ISize = await SizeModel.findByIdAndDelete(id);
            
            return res.json({
                ok: true, 
                sizeDeleted
            });

        } catch (error) { internalSvError(res, error); }
    }
}
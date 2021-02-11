import { IBrand, BrandModel } from '../models/Brand';
import { Request, Response} from 'express';

import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';
import capitalize from '../helpers/capitalize';

export const addBrand = async (req: Request, res: Response) => {
    let {name} = req.body;
    
    name = capitalize(name); 
    
    try {
        
        const brandExist = await BrandModel.findOne({name});
        
        if(brandExist) {
            return errResponse('Ya existe este talle', 401, res, null);
        }
        
        const newBrand: IBrand = new BrandModel({name});
        const brandDB = await newBrand.save();        
        
        return res.json({
            ok: true, 
            brandDB
        }); 

    } catch (error) { internalSvError(res, error); }
}

export const updateBrand = async (req: Request, res: Response) => {
    const data: IBrand = req.body; 
    const id: string = req.params.id;
    try {
        const brand: IBrand = await BrandModel.findById(id);
        
        if(!brand) {
            return errResponse('No se encuentra talle con ese id', 404, res, null);
        } else {
            const brandUpdated: IBrand = await BrandModel.findByIdAndUpdate(id, data, {new: true});
                
            return res.json({
                ok: true, 
                brandUpdated
            });
        }
    } catch (error) { internalSvError(res, error); }
}

export const getBrands = async (req: Request, res: Response) => {
    try {
        const brands: IBrand[] = await BrandModel.find();

        return res.json({
            ok: true, 
            brands
        });

    } catch (error) { internalSvError(res, error); }
}

export  const deleteBrand = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const brand: IBrand = await BrandModel.findById(id); 

    if(!brand) {
        return errResponse('No existe talle con ese id', 404, res, null);
    } else {
        try {
            const brandDeleted: IBrand = await BrandModel.findByIdAndDelete(id);
            
            return res.json({
                ok: true, 
                brandDeleted
            });

        } catch (error) { internalSvError(res, error); }
    }
}
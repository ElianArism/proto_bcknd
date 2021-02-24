import { IType, TypeModel } from '../models/Type';
import { Request, Response} from 'express';

import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';
import capitalize from '../helpers/capitalize';

export const addType = async (req: Request, res: Response) => {
    let {type} = req.body;
    type = capitalize(type);

    try {
        
        const typeExist: IType = await TypeModel.findOne({type});
        
        if(typeExist) {
            return errResponse('Ya existe este tipo de prenda', 401, res, null);
        }
        
        const newType: IType = new TypeModel({type}); 
        const typeDB = await newType.save();        
        
        return res.json({
            ok: true, 
            typeDB
        }); 

    } catch (error) { internalSvError(res, error); }
}

export const updateType = async (req: Request, res: Response) => {
    const data: IType = req.body; 
    const id: string = req.params.id;
    try {
        const type: IType = await TypeModel.findById(id);
        
        if(!type) {
            return errResponse('No se encuentra tipo de prenda con ese id', 404, res, null);
        } else {
            const typeUpdated: IType = await TypeModel.findByIdAndUpdate(id, data, {new: true});
                
            return res.json({
                ok: true, 
                typeUpdated
            });
        }
    } catch (error) { internalSvError(res, error); }
}

export const getTypes = async (req: Request, res: Response) => {
    try {
        const types: IType[] = await TypeModel.find();

        return res.json({
            ok: true, 
            types
        });

    } catch (error) { internalSvError(res, error); }
}

export  const deleteType = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const type: IType = await TypeModel.findById(id); 

    if(!type) {
        return errResponse('No existe tipo de prenda con ese id', 404, res, null);
    } else {
        try {
            const typeDeleted: IType = await TypeModel.findByIdAndDelete(id);
            
            return res.json({
                ok: true, 
                typeDeleted
            });

        } catch (error) { internalSvError(res, error); }
    }
}
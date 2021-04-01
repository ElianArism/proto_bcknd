import fs from 'fs'; 
import { Request, Response } from 'express';
import {v4} from 'uuid'; 
import { ClothesModel, IClothes } from '../models/Clothes';
import Cloudinary from '../cloudinary/cloudinary';
import internalSvError from '../helpers/internal-sv-response';
import errResponse from '../helpers/err-response';

export const uploadImg = async (req: Request, res: Response) => {
    const clothesId = req.params.id; 
    let clothes: IClothes  | null = null;
    try {
        clothes = await ClothesModel.findById(clothesId)
        .populate('type', 'type');      
    } catch (error) {console.log(`error no se encontro prenda`)}; 
    
    if(!clothes) {
        errResponse('No se encontro una prenda con este id', 404, res, null); 
    } 

    if(!req.files || Object.keys(req.files).length === 0) {
        errResponse('No se adjunto archivo de imagen', 400, res, null); 
    }

    const img: File | any = req?.files?.img;

    if(!img) {
        errResponse('No se adjunto archivo de imagen', 400, res, null); 
    }
    
    const nameImg: string = img.name.split('.');
    const extensionImg: string = nameImg[nameImg.length - 1]; 
    const uniqueImgName = `${v4()}.${extensionImg}`; 
    img.name = uniqueImgName; 
    const validateExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif'];

    if(!validateExtensions.includes(extensionImg)) {
        errResponse('El archivo de img no posee una extension valida', 400, res, null); 
    }

    const pathImg = `./uploads/${img.name}`;
   
    img.mv(pathImg, async (err: any) => {
        if(err) {
            internalSvError(res, err);
        } else {
            try {
                let {ok, path, public_id} = await Cloudinary.uploadFile(pathImg, {folder: `${clothes?.type.type}`});

                if(!ok) {
                    errResponse('Ocurrio un error al subir la img al servidor remoto', 500, res, null);
                } else {
                    // img sizing 
                    const pathList:any = path?.split('upload/'); 
                    path = `${pathList[0]}upload/ar_4:3,c_fill/c_scale,w_auto,dpr_auto/${pathList[1]}`;

                    // delete previous img 
                    await Cloudinary.deleteFile(clothes?.img.public_id);

                    // add new img
                    const img = {public_id, path};
                    const updateClothes = await ClothesModel.findByIdAndUpdate(clothesId, {img});
                    
                    // eliminar contenido de uploads para liberar el espacio en el sv
                    if(fs.existsSync(pathImg)) {
                        fs.unlinkSync(pathImg);
                    }        
                    
                    return res.json({
                        ok: true, 
                        path, 
                        updateClothes
                    }); 
                }

            } catch (error) { internalSvError(res, error); }
        }
    });
}
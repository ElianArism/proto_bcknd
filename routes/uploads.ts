import { Router } from 'express';
import fileUpload from 'express-fileupload';

import { uploadImg } from '../controllers/uploads';
import validateJWT from '../middlewares/validate-jwt';

export const uploadRoutes = Router();

uploadRoutes.use(fileUpload()); 

uploadRoutes.post('/uploads/:id', validateJWT, uploadImg); 
// uploadRoutes.put('/uploads', generateJWT, changeClothesImage); 

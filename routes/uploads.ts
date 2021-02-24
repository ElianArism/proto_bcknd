import { Router } from 'express';
import fileUpload from 'express-fileupload';

import { uploadImg } from '../controllers/uploads';
import validateJWT from '../middlewares/validate-jwt';

const uploadRoutes = Router();

uploadRoutes.use(fileUpload()); 

uploadRoutes.put('/uploads/:id', validateJWT, uploadImg); 
// uploadRoutes.put('/uploads', generateJWT, changeClothesImage); 

export default uploadRoutes;
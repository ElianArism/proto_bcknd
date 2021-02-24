import { Router } from 'express';
import { getTypes, addType, updateType, deleteType } from '../controllers/types';
import validateJWT from '../middlewares/validate-jwt';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';


const typesRoutes = Router();

typesRoutes.get('/types', getTypes); 

typesRoutes.post('/types', [
    validateJWT, 
    check('type', 'El campo type es obligatorio').not().isEmpty(), 
    validateFields
], addType);

typesRoutes.put('/types/:id', [
    validateJWT, 
    check('type', 'El campo type es obligatorio').not().isEmpty(), 
    validateFields
], updateType); 

typesRoutes.delete('/types/:id', validateJWT, deleteType); 

export default typesRoutes;
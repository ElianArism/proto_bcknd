import { Router } from 'express';
import validateJWT from '../middlewares/validate-jwt';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import { getBrands, addBrand, updateBrand, deleteBrand } from '../controllers/brands';


const brandRoutes = Router(); 

brandRoutes.get('/brands', getBrands);

brandRoutes.post('/brands', [
    validateJWT,
    check('name', 'El nombre de la marca es obligatorio').not().isEmpty(),
    validateFields
], addBrand);

brandRoutes.put('/brands/:id', [
    validateJWT,
    check('name', 'El nombre de la marca es obligatorio').not().isEmpty(),
    validateFields
], updateBrand);

brandRoutes.delete('/brands/:id', [
    validateJWT
], deleteBrand);

export default brandRoutes; 
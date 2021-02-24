import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../middlewares/validate-fields';

import { addSizes, updateSizes, getSizes, deleteSizes } from '../controllers/sizes';
import validateJWT from '../middlewares/validate-jwt';

const sizesRoutes = Router();

sizesRoutes.get('/sizes', getSizes);

sizesRoutes.post('/sizes', [
    check('size', 'Este campo es obligatorio'),
    validateFields,
    validateJWT
], addSizes);

sizesRoutes.put('/sizes/:id', [
    check('size', 'Este campo es obligatorio'), 
    validateFields, 
    validateJWT
], updateSizes);

sizesRoutes.delete('/sizes/:id', validateJWT, deleteSizes);

export default sizesRoutes;
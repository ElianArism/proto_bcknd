import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import { 
    addClothes, 
    updateClothes, 
    getClothes, 
    deleteClothes, 
    deactivateOrActivateClothes, 
    getOne, 
    getClothes4Sex, 
    setStock 
} from '../controllers/clothes';
import validateJWT from '../middlewares/validate-jwt';

const clothesRoutes = Router();

clothesRoutes.get('/clothes', getClothes); 

clothesRoutes.get('/clothes/:sex', getClothes4Sex); 

clothesRoutes.get('/clothes/one/:id', getOne);

clothesRoutes.post('/clothes', [
    check('brand', 'Este campo es obligatorio'),
    check('type', 'Este campo es obligatorio'),
    check('gender', 'Este campo es obligatorio'),
    check('stock', 'Este campo es obligatorio'),
    check('sizes', 'Este campo es obligatorio'),
    check('price', 'Este campo es obligatorio'),
    validateFields, 
    validateJWT
], addClothes);

clothesRoutes.put('/clothes/:id', [
    check('brand', 'Este campo es obligatorio'),
    check('type', 'Este campo es obligatorio'),
    check('gender', 'Este campo es obligatorio'),
    check('stock', 'Este campo es obligatorio'),
    check('sizes', 'Este campo es obligatorio'),
    check('price', 'Este campo es obligatorio'),
    validateFields,
    validateJWT
], updateClothes); 

clothesRoutes.put('/clothes/activate-clothes/:id', validateJWT, deactivateOrActivateClothes);

clothesRoutes.put('/clothes/setstock/:id', [
    check('stock', 'Este campo es obligatorio'),
    check('size', 'Este campo es obligatorio'),
    validateFields
], setStock);

clothesRoutes.delete('/clothes/:id', validateJWT, deleteClothes)


export default clothesRoutes;
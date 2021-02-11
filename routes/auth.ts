import { Router } from 'express';
import { check } from 'express-validator';

import { getAdmins, addUser, loginUser, renewToken, recoverPassowrd, updateAdmin, deleteAdmins, activateOrDesactivateAdmin } from '../controllers/auth';

import  validateFields from '../middlewares/validate-fields';
import emailExists from '../middlewares/email-exists';
import validateJWT from '../middlewares/validate-jwt';

const authRoutes = Router();

authRoutes.get('/', validateJWT ,getAdmins);

authRoutes.post('/register',
    [   
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields,
        emailExists
    ]
, addUser);

authRoutes.post('/login', 
    [
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'Ingrese un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields    
    ]
, loginUser);

authRoutes.get('/renew-token', validateJWT, renewToken);


authRoutes.post('/recover-password',
    [
        check('email', 'El correo es obligatorio').not().isEmpty(), 
        check('email', 'Ingrese un correo valido').isEmail(),
        validateFields 
    ]
, recoverPassowrd);

authRoutes.put('/', 
[
    check('email', 'El correo es obligatorio').not().isEmpty(), 
    check('email', 'Ingrese un correo valido').isEmail(),
    validateFields, 
    validateJWT
], updateAdmin);

authRoutes.put('/:id', validateJWT, activateOrDesactivateAdmin);
authRoutes.delete('/:id', validateJWT, deleteAdmins);

export default authRoutes;
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { AdminModel, IAdminUser } from '../models/Admin';

import { transporter } from '../config/nodemailer';

import internalSvError from '../helpers/internal-sv-response';
import generateJWT from '../helpers/generate-JWT';
import enviromentVars from '../enviroment.vars';
import errResponse from '../helpers/err-response';


export const getAdmins = async (req:Request, res:Response) => {
    
    try {
        const admins: IAdminUser[] = await AdminModel.find();

        return res.json({
            ok: true, 
            admins
        }); 

    } catch (error) {
        return internalSvError(res, error); 
    }
}

export const addUser = async (req: Request, res: Response) => {
    const newUser: IAdminUser = new AdminModel(req.body);
    const salt: string = bcrypt.genSaltSync();
    newUser.password =  bcrypt.hashSync(newUser.password, salt); 
    
    try {
        const user = await newUser.save();

        res.json({
            ok: true, 
            user
        }); 
    }
    
    catch (error) { internalSvError(res, error); }
}


export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    
    try {
        const user: IAdminUser = await AdminModel.findOne({email});
        
        if(!user) {
            errResponse('No se encontro una cuenta que coincida con el email ingresado', 404, res , null);
        } else if (!user.active) {
            errResponse('Este administrador esta deshabilitado', 400, res, null);
        }
    
        const passwordValid: boolean = bcrypt.compareSync(password, user.password);
        
        if(!passwordValid) {
            errResponse('Contraseña incorrecta', 400, res , null); 
        } else {

            const token = await generateJWT(user.id)
                .then(token => token)
                .catch(err =>  console.log(err));
            
            return res.json({
                ok: true, 
                msg: 'Logged',
                user, 
                token
            });
        }

    } catch (error) { internalSvError(res, error); }
    
}

// renovar el token se trabaja en el frontend

export const renewToken = async (req: Request, res: Response) => {
    const userId: string | undefined = req.header('id');

    if(!userId) {
        errResponse('Bad request, no puede renovarse el token', 400, res , null);

    } else {
        try {
            const [token, user] = await Promise.all([generateJWT(userId), AdminModel.findById(userId)]);
            
            if(!user) {
                return res.status(404).json({
                    ok: false, 
                    msg: 'No se encontró usuario con este id'
                });
            }

            return res.json({
                ok: true, 
                newToken: token,
                user
            });

        } catch (error) { internalSvError(res, error); }
    }
} 

export const recoverPassowrd = async (req: Request, res: Response) => {
    const {email}: {email: string} = req.body;

    try {
        const user: IAdminUser = await AdminModel.findOne({email});
        
        if(!user) {
            errResponse('No se encontro una cuenta que coincida con el email ingresado', 404, res , null);
        }
        
        const serviceEndpoint: string = `http://localhost:4200/auth/recover-password/${user.email}`;
        await transporter.sendMail({
            from: `"Fz Indumentaria" <${enviromentVars.EMAIL_AUTH}>`, // sender address
            to: user.email, 
            subject: "Recuperar contraseña ✔", 
            html: 
                `   
                    <h1><b>Recordá no compartir tus datos con nadie.</b></h1>
                    <a href="${serviceEndpoint}">Cambiar contraseña.</a>
                `
        });

        return res.json({
            ok: true, 
            msg: 'Se envio un email a su correo electronico con la contraseña'
        });

    } catch (error) {
        internalSvError(res, error);
    }
}   

export const updateAdmin = async (req: Request, res: Response) => {
    let { email, password, _id } = req.body;
    let admin: IAdminUser;
    let data;
    let currentId: string = '';
    const changePassMode: any = req.query.changePass; 
  
    try {
        if(changePassMode == 'true') {
            admin = await AdminModel.findOne({email}); 
            if(!admin) {
                errResponse('No se encontro una cuenta que coincida con el email ingresado', 404, res , null);
            }
            const salt: string = bcrypt.genSaltSync();
            const newPassword = bcrypt.hashSync(password, salt); 
            data = {email, password:newPassword};
            currentId = admin.id;
        }
        currentId = _id;
        data = {email}; 
        const adminUpdated = await AdminModel.findByIdAndUpdate(currentId, data, {new: true});
        res.json({
            ok: true, 
            adminUpdated
        }); 

    } catch (error) {internalSvError(res, error);}
}

export const activateOrDesactivateAdmin = async (req: Request, res: Response) => {
    const id = req.params.id; 

    try {
        const admin: IAdminUser = await AdminModel.findById(id); 
        
        if(!admin) {
            errResponse('No se encontro un administrador con ese id', 404, res, null); 
        }

        const data = {active: !admin.active}; 
        const adminUpdated: IAdminUser = await AdminModel.findByIdAndUpdate(id, data, {new: true});
        
        return res.json({
            ok: true, 
            adminUpdated
        }); 

    } catch (error) { internalSvError(res, error); }
}

export const deleteAdmins = async (req: Request, res: Response) => {
    const id = req.params.id; 
    try {
        const adminDeleted: IAdminUser = await AdminModel.findByIdAndDelete(id); 
        
        return res.json({
            ok: true, 
            adminDeleted
        }); 

    } catch (error) { internalSvError(res, error); }
}
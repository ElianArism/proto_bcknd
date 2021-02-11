import jwt = require('jsonwebtoken');
import enviromentVars from '../enviroment.vars';

export default function generateJWT(id: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
        const payload: string = id; 

        jwt.sign({payload}, enviromentVars.SECRET_KEY, {expiresIn: "12h"}, (err, token) => {
            if(err) {
                reject({msg: 'No pudo generarse  el token', logs: err});
            } else {
                resolve(token);
            }
        });
    });
}

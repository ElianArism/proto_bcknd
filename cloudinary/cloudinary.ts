import cloudinary = require('cloudinary') ; 
import enviromentVars from '../enviroment.vars';

export default class Cloudinary {
    constructor() {
        this.config();   
    }

    static initCloudinary() { 
        return new Cloudinary();
    }

    config(): void {
        cloudinary.v2.config({ 
            cloud_name: enviromentVars.CLOUDINARY_CLOUD_NAME, 
            api_key: enviromentVars.CLOUDINARY_API_KEY, 
            api_secret: enviromentVars.CLOUDINARY_API_SECRET 
          });
    }

    static async uploadFile(img: any, config: {} = {}) {
        let error; 
        try {
            const result = await cloudinary.v2.uploader.upload(img, config, (err:any, img:any) => {
                if(err) {
                    error = 'Ocurrio un error';
                    return {ok:false, error}; 
                }
            });
            
            return {ok:true, path: result.secure_url, public_id: result.public_id};

        } catch (error) {return {ok:false, error};}
    }

    static async deleteFile(public_id: string) {
        try {
            await cloudinary.v2.api.delete_resources([public_id]);
        } catch (error) {return {ok:false, error};}
    }
}
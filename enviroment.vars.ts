export default {
    DB_CONN:  process.env.DB_CONN || '',
    PORT: process.env.PORT || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    EMAIL_AUTH: process.env.EMAIL_AUTH || '',
    PASS_APPLICATION_AUTH: process.env.PASS_APPLICATION_AUTH || '', 
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    MERCADOPAGO_API_KEY: process.env.MERCADOPAGO_API_KEY || ''
}
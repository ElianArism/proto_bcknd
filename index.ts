import dotenv = require('dotenv');
dotenv.config();

import cors = require('cors');
import Database from './database/config';
import Server from './server/server';
import Cloudinary from './cloudinary/cloudinary';
import express from 'express';
import authRoutes from './routes/auth';
import enviromentVars from './enviroment.vars';
import clothesRoutes from './routes/clothes';
import sizesRoutes from './routes/sizes';
import uploadRoutes from './routes/uploads';
import brandRoutes from './routes/brand';
import typesRoutes from './routes/type';
import searchEngineRoutes from './routes/searchEngine ';
import mercadoPagoRoutes from './routes/mercadopago';

const sv = Server.initInstance(Number(enviromentVars.PORT)); 

sv.app.use(cors());
sv.app.use(express.json());

sv.app.use('/api/auth', authRoutes);
sv.app.use('/api', clothesRoutes);
sv.app.use('/api', brandRoutes);
sv.app.use('/api', typesRoutes);
sv.app.use('/api', sizesRoutes);
sv.app.use('/api', uploadRoutes);
sv.app.use('/api', searchEngineRoutes);
sv.app.use('/api', mercadoPagoRoutes);

const db = Database.initDB();
db.connectDB(enviromentVars.DB_CONN);

const cloudinary = Cloudinary.initCloudinary();

sv.app.use(express.static('public'));

sv.startServer(() => {
    console.log('Servidor corriendo en el puerto ', enviromentVars.PORT);
});
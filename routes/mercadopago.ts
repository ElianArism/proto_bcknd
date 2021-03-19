import { Router } from "express";
import { getProductTopay } from "../controllers/mercadopago";


const mercadoPagoRoutes = Router(); 

mercadoPagoRoutes.get('/payment/:id', getProductTopay);

export default mercadoPagoRoutes;
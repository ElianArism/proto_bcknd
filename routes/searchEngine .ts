import { Router } from "express";
import { searchEngineGeneral } from "../controllers/searchEngines";

const searchEngineRoutes = Router();

searchEngineRoutes.get('/search/:search', searchEngineGeneral); 

export default searchEngineRoutes; 
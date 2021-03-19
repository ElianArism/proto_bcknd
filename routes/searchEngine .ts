import { Router } from "express";
import { filterEngine, filterEngine4Sex, searchEngine4Sex, searchEngineGeneral } from "../controllers/searchEngines";

const searchEngineRoutes = Router();

searchEngineRoutes.get('/search/:search', searchEngineGeneral); 
searchEngineRoutes.get('/search', filterEngine); 
searchEngineRoutes.get('/filter-sex/:sex', filterEngine4Sex); 
searchEngineRoutes.get('/search-sex/:search', searchEngine4Sex); 

export default searchEngineRoutes; 
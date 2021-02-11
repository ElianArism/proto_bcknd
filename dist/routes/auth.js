"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var authRoutes = express_1.Router();
authRoutes.get('/', auth_1.TestHttpResponse);
exports.default = authRoutes;

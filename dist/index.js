"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var cors = require('cors');
var config_1 = __importDefault(require("./database/config"));
var server_1 = __importDefault(require("./server/server"));
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var secretKey = process.env.DB_CONN;
var port = process.env.PORT;
var sv = server_1.default.initInstance(port);
sv.app.use(cors());
sv.app.use(express_1.default.json());
sv.app.use('/api/admin', auth_1.default);
var db = config_1.default.initDB();
db.connectDB(secretKey);
sv.startServer(function () {
    console.log('Servidor corriendo en el puerto ', port);
});

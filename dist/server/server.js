"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server(port) {
        this.app = express_1.default();
    }
    Server.initInstance = function (port) {
        return new Server(port);
    };
    Server.prototype.startServer = function (callback) {
        this.app.listen(this.app, callback);
    };
    return Server;
}());
exports.default = Server;

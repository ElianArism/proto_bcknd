"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHttpResponse = void 0;
exports.TestHttpResponse = function (req, res) {
    console.log('data');
    return res.json({
        ok: true,
        msg: 'Funciona! It works!'
    });
};

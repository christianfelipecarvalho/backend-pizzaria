"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //receber o token
    const authToken = req.headers.authorization;
    //validar se token está preenchido
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        //validar se token é válido
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //recuperar id do token e colocar em uma variavel @types
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}

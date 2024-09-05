import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
   
    //receber o token
    const authToken = req.headers.authorization;

    //validar se token está preenchido
    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //validar se token é válido
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
         //recuperar id do token e colocar em uma variavel @types
        req.user_id = sub;
        return next();

    } catch (err) {
        return res.status(401).end();
    }

}
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { router } from './routes';
const app = express();

app.use(express.json());

app.use(cors());
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024 //Limitando a no maximo 50mb 
    }
}))
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
} )

app.listen(3333, () => console.log('Server está em execução!!!'));
import jwt from 'jsonwebtoken';
import authToken from '../config/authToken';
import {promisify} from 'util';

export default async (req, res, next) => {

    //Require o token de autenticação via header
    const authHeader = req.headers.authorization;

    //verificar se o token foi enviado
    if(!authHeader){
        return res.status(401).json({error: 'Token not provided'});
    }

    //separar o token do bearer
    const [, token] = authHeader.split(' ');

    try{
        //decodificar o token, com o promisify
        const decoded = await promisify(jwt.verify)(token, authToken.secret);

        //incluir o id do usuário no req
        req.userId = decoded.id;

        return next();


    }catch(err){
        return res.status(401).json({error: 'Token invalid'});
    }
}
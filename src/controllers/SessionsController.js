import  Jwt  from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authToken from "../config/authToken";

// Autenticação de usuário
class SessionController{

    async create(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({error: 'User not found'});
        }
        
        if(!(await checkPassword(user, password))){
            return res.status(401).json({error: 'Password does not match'});
        }

        //pegar o id do usuário
        const {id} = user;

        //retornar o token e o usuário
        return res.json({
            user: {
                id,
                email
            },
            //gerar o token
            token: Jwt.sign({id}, authToken.secret, {
                //Configurações do token, como tempo de expiração
                expiresIn: authToken.expiresIn,
            }),
        });




    }

}

export default new SessionController();
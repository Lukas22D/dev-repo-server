import User from "../models/User.js";
import { createPasswordHash } from "../services/auth.js";


class UsersController {

    async index(req, res) {
        try{
            // Busca todos os usuários
            const users = await User.find();
            return res.json(users);

        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        };
    };


    async show (req, res) {
        try{
            // Busca o parâmetro id da requisição
            const { id} = req.params;
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            };

            return res.json(user);

        }catch(err){
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }


    };

    
    async create (req, res) {
        try{
            const {email, password} = req.body;

            // Verifica se o usuário já existe
            const user = await User.findOne({email});

            // Se o usuário já existir, retorna um erro
            if(user) {
                return res.status(422)
                .json({error: `Usuário com o email: ${email}, já existe`});
            };
            // criptografar a senha
            const ecryptedPassword = await createPasswordHash(password);

            // Cria o usuário e retorna o usuário criado
            const newUser = await User.create({email, password: ecryptedPassword});
            return res.status(201).json(newUser);

        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }
        
    
    }

    async update (req, res) {

        try{
            const { id } = req.params;	
            const { email, password } = req.body;

            // Busca o usuário pelo id
            const user = await User.findById(id);
            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }
            //Encriptar a nova senha
            const ecryptedNewPassword = await createPasswordHash(password);

            // Atualiza o usuário
            await user.updateOne({email, password: ecryptedNewPassword});
            return res.json({message: "Usuário atualizado com sucesso"}); 


        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }

    }

    async delete (req, res) {
        
        try{
            const { id } = req.params;

            // Busca o usuário pelo id
            const user = await User.findById(id);
            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            // Deleta o usuário
            await user.deleteOne();
            return res.json({message: "Usuário deletado com sucesso"});

        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }


    }


}



export default new UsersController;
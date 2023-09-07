import User from "../models/User.js";
import Repository from "../models/Repository.js";

class RepositoriesController {

    async index(req, res) {
        try{
            const { user_id } = req.params;
            const { q } = req.query;

            const user = await User.findById(user_id);
            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }
            
            let query = {};
            if(q) {
                query = {url: {$regex: q}};

            }

            // Busca os repositórios do usuário
            const repositories = await Repository.find({userId: user_id, ...query});

            return res.json(repositories);

        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }
    };

    async create(req, res) {
        try{
            const { user_id } = req.params;
            const {name, url} = req.body;

            //Verefica se o usuário existe
            const user = await User.findById(user_id);

            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            //Verefica se o Repostório já existe
            const repository = await Repository.findOne({url, userId: user_id});

            if(repository) {
                return res.status(422).json({error: "Repositório já existe"});
            };

            const newRepository = await Repository.create({name, url, userId: user_id});

            return res.status(201).json(newRepository);          
        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        };
    };

    async delete (req, res) {
        try{
            const { user_id, id } = req.params;
            const user = await User.findById(user_id);
            if(!user) {
                return res.status(404).json({error: "Usuário não encontrado"});
            }
            // Busca o repositório do usuário
            const repository = await Repository.findOne({userId: user_id, _id: id});
            
            if(!repository) {
                return res.status(404).json({error: "Repositório não encontrado"});
            }

            await repository.deleteOne();

            return res.status(204).json();

        }catch(err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno no servidor"});
        }
    }


}

export default new RepositoriesController();
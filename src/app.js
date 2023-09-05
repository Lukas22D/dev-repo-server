import  express, {Router}  from "express";
import cors from "cors";
import routes from "./routes";

// Importando o arquivo de conexão com o banco de dados e iniciando a conexão
import "./database"

class app {
    // Método construtor, serve para iniciar a classe
    constructor(){
        // Inicializando o servidor
        this.server = express();
        // Inicializando os middlewares
        this.middlewares();
        // Inicializando as rotas
        this.routes();
    }
    // Método para inicializar os middlewares
    middlewares(){
        // Habilitando o cors
        // cors é um middleware que permite que o backend seja acessado por qualquer frontend
        this.server.use(cors());
        // Habilitando o express para receber json
        this.server.use(express.json());
    }
    // Método para inicializar as rotas
    routes(){
        // Inicializando as rotas
        this.server.use(routes);

    }

}

export default new app().server;
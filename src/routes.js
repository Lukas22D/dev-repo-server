// Router
import { Router } from "express";

//Middlewares
import  auth  from "./middlewares/auth";

//Controllers
import  helloController  from "./controllers/helloController";
import  UsersController  from "./controllers/UsersController";
import  RepositoriesController from "./controllers/RepositoriesController";
import SessionController from "./controllers/SessionsController";

const routes = new Router();

// Rotas Públicas
routes.put('/', SessionController.create);


//Rotas Privadas
routes.use(auth);

//RESTFULL
//criar uma API de usuários
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

//criar uma API de repositórios

routes.get('/users/:user_id/repositories', RepositoriesController.index); 
routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.delete('/users/:user_id/repositories/:id', RepositoriesController.delete);

export default routes;
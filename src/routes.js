import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/alive', (req, res) => {
  return res.json('ok');
});

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

export default routes;

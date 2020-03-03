import { Router } from 'express';
import multer from 'multer';

import FileController from './app/controllers/FileController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import isAdmin from './app/middlewares/administrator';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/products', ProductController.index);
routes.post('/products', isAdmin, ProductController.store);
routes.put('/products/:id', isAdmin, ProductController.update);
routes.delete('/products/:id', isAdmin, ProductController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

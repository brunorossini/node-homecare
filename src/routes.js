import { Router } from 'express';
// import ExpressBrute from 'express-brute';
// import RedisStore from 'express-brute-redis';
import multer from 'multer';

import AddressController from './app/controllers/AddressController';
import FileController from './app/controllers/FileController';
import ItemController from './app/controllers/ItemController';
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import StepController from './app/controllers/StepController';
import UserController from './app/controllers/UserController';
import isAdmin from './app/middlewares/administrator';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// PREVENT BRUTE FORCE IN REQUEST
// const bruteStore = new RedisStore({
//   url: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
// });

// const bruteForce = new ExpressBrute(bruteStore);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/products/:providerId', ProductController.index);
routes.post('/products', isAdmin, ProductController.store);
routes.put('/products/:id', isAdmin, ProductController.update);
routes.delete('/products/:id', isAdmin, ProductController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.delete('/orders/:id', OrderController.delete);

routes.post('/addresses', AddressController.store);
routes.get('/addresses', AddressController.index);
routes.delete('/addresses/:id', AddressController.delete);

routes.get('/providers', ProviderController.index);

routes.get('/steps/:id', StepController.index);
routes.post('/steps', StepController.store);
routes.delete('/steps/:id', StepController.delete);

routes.post('/items', ItemController.store);
routes.delete('/items/:id', ItemController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

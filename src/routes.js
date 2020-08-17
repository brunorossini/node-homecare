import { Router } from 'express';
// import ExpressBrute from 'express-brute';
// import RedisStore from 'express-brute-redis';
// import multer from 'multer';

import AddressController from './app/controllers/AddressController';
import AppointmentController from './app/controllers/AppointmentController';
import AvailableController from './app/controllers/AvailableController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
// import multerConfig from './config/multer';

const routes = new Router();
// const upload = multer(multerConfig);

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

routes.post('/addresses', AddressController.store);
routes.get('/addresses', AddressController.index);
routes.delete('/addresses/:id', AddressController.delete);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schedule', ScheduleController.index);

export default routes;

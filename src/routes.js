import { Router } from 'express';

import UserController from './app/controllers/userController';
import AuthController from './app/controllers/authController';
import ScheduleController from './app/controllers/scheduleController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', AuthController.store);

routes.use(authMiddleware);

routes.get('/schedules', ScheduleController.index);
routes.get('/today', ScheduleController.today);
routes.get('/start_day', ScheduleController.start_day);
routes.get('/start_lunch', ScheduleController.start_lunch);
routes.get('/end_lunch', ScheduleController.end_lunch);
routes.get('/end_day', ScheduleController.end_day);

export default routes;

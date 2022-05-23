import { Router } from 'express';
import userRoutes from './controllers/userRoutes';

const routes = Router();

routes.use('/user', userRoutes);

export default routes;

import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;

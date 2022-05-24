import { Router } from 'express';
import { isAuthenticated } from '../../../middlewares/verifyToken';
import { UserController } from './UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', isAuthenticated, userController.listAll);
userRoutes.post('/', isAuthenticated, userController.createUser);

export default userRoutes;

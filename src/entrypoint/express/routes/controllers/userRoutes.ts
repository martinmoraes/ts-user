import { Router } from 'express';
import { isAuthenticated } from '../../../middlewares/verifyToken';
import { UserController } from './UserController';
import { userValidate } from '../../../middlewares/userValidator';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', isAuthenticated, userController.listAll);
userRoutes.post('/', userValidate, userController.createUser);
userRoutes.patch(
  '/:id',
  isAuthenticated,
  userValidate,
  userController.updateUser,
);
userRoutes.get('/:id', isAuthenticated, userController.findUser);

export default userRoutes;

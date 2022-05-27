import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/verifyToken';
import { UserController } from './controllers/UserController';
import { userCreateValidate } from '../../middlewares/userCreateValidator';
import { userUpdateValidate } from '../../middlewares/userUpdateValidator';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', isAuthenticated, userController.listAll);
userRoutes.post('/', userCreateValidate, userController.createUser);
userRoutes.patch(
  '/:id',
  isAuthenticated,
  userUpdateValidate,
  userController.updateUser,
);
userRoutes.get('/:id', isAuthenticated, userController.findUser);
userRoutes.delete('/:id', isAuthenticated, userController.deleteUser);

export default userRoutes;

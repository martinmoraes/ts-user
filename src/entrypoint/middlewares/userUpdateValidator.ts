import { body } from 'express-validator';

export const userUpdateValidate = [
  body('first_name').escape().optional(),
  body('last_name').escape().optional(),
  body('password').escape().optional(),
  body('email').escape().isEmail().optional(),
];

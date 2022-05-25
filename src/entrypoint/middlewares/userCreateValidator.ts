import { body } from 'express-validator';

export const userCreateValidate = [
  body('first_name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Primeiro nome é obrigatório'),
  body('last_name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Último nome é obrigatório'),
  body('password').escape().not().isEmpty().withMessage('Senha é obrigatório'),
  body('email').escape().isEmail().withMessage('É requerido e-mail válido'),
];

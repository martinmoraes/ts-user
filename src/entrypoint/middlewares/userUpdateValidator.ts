import { body } from 'express-validator';

export const userUpdateValidate = [
  body('first_name').escape().optional(),
  body('last_name').escape().optional(),
  body('password')
    .escape()
    .optional()
    .isString()
    .isLength({ min: 8, max: 25 })
    .withMessage('min character 8 nad max character 25')
    .not()
    .isLowercase()
    .withMessage('need uppercase ')
    .not()
    .isUppercase()
    .withMessage('need lowercase')
    .not()
    .isNumeric()
    .withMessage('need number')
    .not()
    .isAlpha()
    .withMessage('need alpha'),
  body('email').escape().isEmail().optional(),
];

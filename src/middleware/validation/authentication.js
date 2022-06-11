/**
 * The authentication validators
 */

import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('E-mail is een verplicht veld.')
    .bail()
    .isEmail()
    .withMessage('E-mail is niet juist.'),
  body('password')
    .isLength({
      min: 6,
    })
    .withMessage('Wachtwoord moet minstens 6 karakters lang zijn.'),
];

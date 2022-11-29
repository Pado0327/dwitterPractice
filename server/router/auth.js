import express from 'express';
import * as authController from '../controller/authController.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCrendential = [
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage('username should be at least 5 chracters'),
  body('password').trim().escape().isStrongPassword(),
  validate,
];

const validateSignUp = [
  ...validateCrendentiala,
  body('name').trim().escape().notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

//router.get('/me', authController.handleSignUp);

router.post('/signup', validateSignUp, authController.handleSignUp);

router.post('/login', validateCrendential, authController.handleLogin);

export default router;

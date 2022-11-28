import express from 'express';
import * as authController from '../controller/authController.js';

const router = express.Router();

//router.get('/me', authController.handleSignUp);

router.post('/signup', authController.handleSignUp);

router.post('/login', authController.handleLogin);

export default router;

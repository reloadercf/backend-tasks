import express from 'express';
import {
  userControllerRegister, authenticate, userConfirm, forgetPassword, verifyToken,
  changePassword, profile,
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const Router = express.Router();

/**
 * To autenticación create and confirm users
 * This section of code is allowed access public */

Router.post('/', userControllerRegister);
Router.post('/login', authenticate);
Router.get('/confirm/:token', userConfirm);
Router.get('/forget-password', forgetPassword);
Router.route('/forget-password/:token').get(verifyToken).post(changePassword);

Router.get('/profile', checkAuth, profile);

export default Router;

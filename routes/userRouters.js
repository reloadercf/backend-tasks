import express from 'express';
import {
  userControllerRegister, authenticate, userConfirm, forgetPassword, verifyToken,
  changePassword,
} from '../controllers/userController.js';

const Router = express.Router();

// to autenticate create and confirm users
Router.post('/', userControllerRegister);
Router.post('/login', authenticate);
Router.get('/confirm/:token', userConfirm);
Router.get('/forget-password', forgetPassword);
Router.route('/forget-password/:token').get(verifyToken).post(changePassword);

export default Router;

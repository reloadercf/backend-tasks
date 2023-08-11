import express from 'express';
import {
  userControllerRegister, authenticate, userConfirm, forgetPassword, verifyToken,
  changePassword, profile,
} from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const Router = express.Router();

// to autenticate create and confirm users
Router.post('/', userControllerRegister);
Router.post('/login', authenticate);
Router.get('/confirm/:token', userConfirm);
Router.get('/forget-password', forgetPassword);
Router.route('/forget-password/:token').get(verifyToken).post(changePassword);

Router.get('/perfil', checkAuth, profile);

export default Router;

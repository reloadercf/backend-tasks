import express from 'express';
import { userControllerRegister, authenticate, userConfirm } from '../controllers/userController.js';

const Router = express.Router();

// to autenticate create and confirm users
Router.post('/', userControllerRegister);
Router.post('/login', authenticate);
Router.get('/confirm/:token', userConfirm);

export default Router;

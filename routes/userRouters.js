import express from 'express';
import { userControllerRegister, authenticate } from '../controllers/userController.js';

const Router = express.Router();

// to autenticate create and confirm users
Router.post('/', userControllerRegister);
Router.post('/login', authenticate);

export default Router;

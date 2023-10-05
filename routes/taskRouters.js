import express from 'express';

import {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  changeStatusTask,
} from '../controllers/taskController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
  .post(checkAuth, addTask);

router.route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

router.route('/status/:id', checkAuth, changeStatusTask);

export default router;

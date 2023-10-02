import express from 'express';

import {
  getAllProjectsUser,
  addProject,
  getProject,
  editProject,
  deleteProject,
  addPartner,
  deletePartner,
  getTasks,
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();
router
  .route('/')
  .get(checkAuth, getAllProjectsUser)
  .post(checkAuth, addProject);

router.route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.get('/tasks/:id', checkAuth, getTasks);
router.post('/add-partner/:id', checkAuth, addPartner);
router.post('/delete-partner/:id', checkAuth, deletePartner);

export default router;

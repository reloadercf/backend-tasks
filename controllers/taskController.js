/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const addTask = async (req, res) => {
  try {
    const { project } = req.body;
    const isProject = await Project.findById(project);

    if (!isProject) {
      const error = new Error('Project no found');
      return res.status(404).json({ message: error.message });
    }
    if (isProject.author.toString() !== req.UserLogged._id.toString()) {
      const error = new Error('Access denied, user does not have permissions');
      return res.status(404).json({ message: error.message });
    }

    const taskSave = await Task.create(req.body);
    res.status(200).json({
      message: 'Task has been crate',
      taskSave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('Task no found');
    return res.status(404).json({ message: error.message });
  }

  if (task.project.author.toString() !== req.UserLogged._id.toString()) {
    const error = new Error('Action no allowed');
    return res.status(403).json({ message: error.message });
  }
  res.json({ task });
};

export const updateTask = async (req, res) => {

};

export const deleteTask = async (req, res) => {

};

export const changeStatusTask = async (req, res) => {

};

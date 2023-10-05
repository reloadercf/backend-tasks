/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Project from '../models/Project.js';

export const getAllProjectsUser = async (req, res) => {
  const projects = await Project.find().where('author').equals(req.UserLogged);
  res.json(projects);
};

export const addProject = async (req, res) => {
  const project = new Project(req.body);
  project.author = req.UserLogged._id;
  try {
    const projectSaved = await project.save();
    res.json(projectSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project no found' });
    }
    if (project.author.toString() !== req.UserLogged._id.toString()) {
      return res.status(404).json({ message: 'Access denied, user does not have permissions' });
    }
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ message: 'Project no found' });
  }
  if (project.author.toString() !== req.UserLogged._id.toString()) {
    return res.status(404).json({ message: 'Access denied, user does not have permissions' });
  }
  project.projectName = req.body.projectName || project.projectName;
  project.description = req.body.description || project.description;
  project.dateDelivery = req.body.dateDelivery || project.dateDelivery;
  project.client = req.body.client || project.client;
  try {
    const projectSaved = await project.save();
    res.json(projectSaved);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({ message: 'Project no found' });
  }
  if (project.author.toString() !== req.UserLogged._id.toString()) {
    return res.status(404).json({ message: 'Access denied, user does not have permissions' });
  }
  try {
    await project.deleteOne();
    res.json({ message: 'The project has been deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addPartner = async (req, res) => {

};

export const deletePartner = async (req, res) => {

};

export const getTasks = async (req, res) => {

};

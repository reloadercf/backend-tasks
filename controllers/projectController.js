import Project from '../models/Project.js';

export const getAllProjectsUser = async (req, res) => {

};

export const addProject = async (req, res) => {
  const project = new Project(req.body);
  project.author = req.UserLogged._id;
  try {
    const projectSaved = await project.save();
    res.json(projectSaved);
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (req, res) => {

};

export const editProject = async (req, res) => {

};

export const deleteProject = async (req, res) => {

};

export const addPartner = async (req, res) => {

};

export const deletePartner = async (req, res) => {

};

export const getTasks = async (req, res) => {

};

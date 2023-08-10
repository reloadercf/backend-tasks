/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import User from '../models/Users.js';
import idGenerate from '../helpers/idGenetate.js';
import generateJWT from '../helpers/generateJWT.js';

const userControllerRegister = async (req, res) => {
  const { email } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    const error = Error('User has been registered in the past, try again with new email');
    res.status(400).json({ msj: error.message });
  }
  try {
    const user = new User(req.body);
    user.token = idGenerate();
    const userSavedDB = await user.save();
    res.json(userSavedDB);
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // to verify user existUser
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User don't exist");
    return res.status(404).json({ msj: error.message });
  }
  // to verify user was confirmed
  if (!user.confirm) {
    const error = new Error('You need confirm your account');
    return res.status(403).json({ msj: error.message });
  }
  // to verify password
  if (await user.verifyPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error('Incorrect password, please try again');
    return res.status(403).json({ msj: error.message });
  }
};

const userConfirm = async (req, res) => {
  const { token } = req.params;
  const userConfirmed = await await User.findOne({ token });
  if (userConfirmed) {
    try {
      userConfirmed.confirm = true;
      userConfirmed.token = null;
      await userConfirmed.save();
      res.status(200).json({ msj: 'Success, user has been confirmed' });
    } catch (error) {
      res.status(500).json({ msj: 'Internal error, please try again later' });
    }
  } else {
    const error = new Error('User no found');
    return res.status(403).json({ msj: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  // to verify user existUser
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User don't exist");
    return res.status(404).json({ msj: error.message });
  }
  try {
    user.token = idGenerate();
    await user.save();
    res.json({ msj: 'We send mail with the instructions, please open your email and change password' });
  } catch (error) {
    console.log(error);
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;
  const isValidToken = await User.findOne({ token });
  if (isValidToken) {
    res.status(200).json({ ms: 'Success' });
  } else {
    const error = new Error('Invalid token');
    return res.status(404).json({ msj: error.message });
  }
};

const changePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const isUser = await User.findOne({ token });
  if (isUser) {
    isUser.password = password;
    isUser.token = null;
    try {
      await isUser.save();
      res.json({ msj: 'Password was changed successful' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Invalid change, please try again');
    res.status(404).json({ msg: error.message });
  }
};

export {
  userControllerRegister, authenticate, userConfirm, forgetPassword, verifyToken, changePassword,
};

/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import User from '../models/Users.js';
import idGenerate from '../helpers/idGenetate.js';
import generateJWT from '../helpers/generateJWT.js';
import senderEmail from '../helpers/email.js';
import messagesEmail from '../helpers/messagesEmail.js';

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
    // send email to confirm account
    senderEmail({
      email: userSavedDB.email,
      name: userSavedDB.name,
      token: userSavedDB.token,
    }, messagesEmail.confirm);

    res.json({
      msj: 'User has been created successful!, we send mail to confirm your account',
      error: false,
      response: userSavedDB,
    });
  } catch (error) {
    res.status(400).json({ msj: 'Server error' });
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
    const error = new Error('Confirmation no found');
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
    senderEmail({
      email: user.email,
      name: user.name,
      token: user.token,
    }, messagesEmail.forgetPassword);
    res.json({ msj: 'We send mail with the instructions, please open your email and change password' });
  } catch (error) {
    const server = new Error('server error');
    return res.status(403).json({ msj: server.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;
  const isValidToken = await User.findOne({ token });
  if (isValidToken) {
    res.status(200).json({ msj: 'Success' });
  } else {
    const error = new Error('Invalid token');
    return res.status(404).json({ msj: error.message });
  }
};

const changePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const isFoundUser = await User.findOne({ token });
  if (isFoundUser) {
    isFoundUser.password = password;
    isFoundUser.token = null;
    try {
      await isFoundUser.save();
      res.json({ msj: 'Password was changed successful' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('Invalid change, please try again');
    res.status(404).json({ msg: error.message });
  }
};

const profile = async (req, res) => {
  const { UserLogged } = req;
  res.json(UserLogged);
};

export {
  userControllerRegister, authenticate, userConfirm, forgetPassword, verifyToken, changePassword,
  profile,
};

/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import User from '../models/Users.js';
import idGenerate from '../helpers/idGenetate.js';
import generateJWT from '../helpers/generateJWT.js';

const userControllerRegister = async (req, res) => {
  console.log(req.body);
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

export { userControllerRegister, authenticate, userConfirm };

/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import User from '../models/Users.js';
import idGenerate from '../helpers/idGenetate.js';

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
    });
  } else {
    const error = new Error('Incorrect password, please try again');
    return res.status(403).json({ msj: error.message });
  }
};

export { userControllerRegister, authenticate };

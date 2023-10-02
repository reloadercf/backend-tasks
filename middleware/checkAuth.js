/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.UserLogged = await User.findById(decoded.id)
        .select('-password -token -confirm -createdAt -updatedAt -__v');
      return next();
    } catch (err) {
      return res.status(404).json(
        {
          msj: 'Have problem, try again!',
        },
      );
    }
  }
  if (!token) {
    const error = new Error('Token invalid');
    res.status(401).json({ msj: error.message });
  }
  next();
};

export default checkAuth;

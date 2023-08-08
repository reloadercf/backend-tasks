import jwt from 'jsonwebtoken';

const generateJWT = (idUser) => jwt.sign({ id: idUser }, process.env.JWT_SECRET, {
  expiresIn: '10d',
});

export default generateJWT;

/* eslint-disable import/prefer-default-export */
const usersControllerGet = (req, res) => {
  res.json({ msj: 'i recived post method' });
};

const userControllerPost = (req, res) => {
  res.json({ msj: 'user was created' });
};

export { usersControllerGet, userControllerPost };

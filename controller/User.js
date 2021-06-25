const UserService = require('../service/Users');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
  const { message, code, token } = await UserService
  .createUser(displayName, email, password, image);
  if (message) return res.status(code).json({ message });
  return res.status(201).json({ token });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { message, code, token } = await UserService.userLogin(email, password);
  if (message) return res.status(code).json({ message });
  return res.status(200).json({ token });
};

const getUser = async (req, res) => {
  const data = await UserService.getUser();
  return res.status(200).json(data);
};

module.exports = {
    createUser,
    getUser,
    userLogin,
};
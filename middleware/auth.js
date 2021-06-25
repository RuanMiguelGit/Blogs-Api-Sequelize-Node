const jwt = require('jsonwebtoken');

const segredo = 'seusecretdetoken';
const notAuth = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(notAuth).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, segredo);
    if (!decoded) {
      return res
        .status(notAuth)
        .json({ message: 'Expired or invalid token ' });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(notAuth).json({ message: 'Expired or invalid token' });
  }
};

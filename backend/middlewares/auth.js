const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return new AuthorizationError('Требуется авторизация');
  }

  req.user = payload;
  return next();
};

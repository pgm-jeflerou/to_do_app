/**
 * The JWT authentication middleware
 */

import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
  const { token } = req.cookies;

  try {
    const user = jwt.verify(token, process.env.TOKEN_SALT);
    req.user = user;
    return next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

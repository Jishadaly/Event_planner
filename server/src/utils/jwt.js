const jwt = require('jsonwebtoken');


exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,       // must be true in production (Vercel uses HTTPS)
    sameSite: "None",   // required for cross-domain cookies
    maxAge: 5 * 24 * 60 * 60 * 1000,
  };
  res.cookie('sessionToken', token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    user,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};


exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
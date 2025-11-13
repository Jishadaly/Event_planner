const jwt = require('jsonwebtoken');


exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const options = {
    httpOnly: true, //prevent access from client
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // Cookie expiration in milliseconds (e.g., 1 hour)
    sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax', // Or 'Strict' or 'None' depending on your needs
    // domain: '.yourdomain.com', // Optional: Specify the domain for the cookie
    // path: '/' // Optional: Specify the path for the cookie
  }
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
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.model');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.sessionToken;

  if (!token) {
    return next(new AppError('Unauthorized: No token provided in cookie', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select('-password');
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401));
  }
  console.log(currentUser)
  req.user = currentUser;
  next();
});

//Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role , ' ' , roles)
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }

    next();
  };
};
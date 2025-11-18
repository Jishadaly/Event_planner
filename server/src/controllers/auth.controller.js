const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { createSendToken } = require('../utils/jwt');
const { sendWelcomeEmail } = require('../services/email/email.service');
const { createDoc, findOne } = require('../utils/db.utils');
const bcrypt = require('bcryptjs');



exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const existingUser = await findOne(User, { email })
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  const user = await createDoc(User, {
    name,
    email,
    password,
    role: role || 'participant',
  })

  sendWelcomeEmail(user)
  createSendToken(user, 201, res);
});


exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password', 400));
  }

  user.isOnline = true;
  user.lastSeen = Date.now();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});


exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
})
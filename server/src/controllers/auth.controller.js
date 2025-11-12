const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { createSendToken } = require('../utils/jwt');
const { sendWelcomeEmail } = require('../services/email.service');
const { createDoc, findOne } = require('../utils/db.utils');


exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  console.log(User)
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

  sendWelcomeEmail(user).catch((err) =>
    console.error('Failed to send welcome email:', err)
  );

  createSendToken(user, 201, res);
});


exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  user.isOnline = true;
  user.lastSeen = Date.now();
  await user.save({ validateBeforeSave: false });

  // Send token response
  createSendToken(user, 200, res);
});


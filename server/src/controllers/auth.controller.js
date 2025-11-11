const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const { createSendToken } = require('../utils/jwt');
const { sendWelcomeEmail } = require('../services/email.service');
const { createDoc, findOne } = require('../utils/db.utils');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  console.log(User)
  const existingUser = await findOne(User, { email })
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // Create new user
  const user = await createDoc(User, {
    name,
    email,
    password,
    role: role || 'participant',
  })

  // Send welcome email (non-blocking)
  sendWelcomeEmail(user).catch((err) =>
    console.error('Failed to send welcome email:', err)
  );

  // Send token response
  createSendToken(user, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists && password is correct
  const user = await findOne(User, email)

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  // Update online status
  user.isOnline = true;
  user.lastSeen = Date.now();
  await user.save({ validateBeforeSave: false });

  // Send token response
  createSendToken(user, 200, res);
});


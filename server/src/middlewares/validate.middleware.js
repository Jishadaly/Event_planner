const AppError = require('../utils/AppError');

/**
 * Validate event creation/update
 */
exports.validateEvent = (req, res, next) => {
  const { title, description, category, startTime, endTime, location } = req.body;

  const errors = [];
  console.log(req.body)

  // Validate required fields for creation
  if (req.method === 'POST') {
    if (!title) errors.push('Title is required');
    if (!description) errors.push('Description is required');
    if (!category) errors.push('Category is required');
    if (!startTime) errors.push('Start time is required');
    if (!endTime) errors.push('End time is required');
    if (!location) errors.push('Location is required');
  }

  // Validate date logic
  if (startTime && endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime())) {
      errors.push('Invalid start time format');
    }
    if (isNaN(end.getTime())) {
      errors.push('Invalid end time format');
    }

    if (end <= start) {
      errors.push('End time must be after start time');
    }

    if (start < new Date()) {
      errors.push('Start time cannot be in the past');
    }
  }

  // Validate category
  const validCategories = ['meeting', 'conference', 'workshop', 'social', 'other'];
  if (category && !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  // Validate title length
  if (title && title.length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  // Validate description length
  if (description && description.length > 2000) {
    errors.push('Description cannot exceed 2000 characters');
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join('. '), 400));
  }

  next();
};


exports.validateFiles = (req, res, next) => {
  const image = req.files?.image?.[0];
  const attachments = req.files?.attachments || [];

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const allowedFileTypes = [
    ...allowedImageTypes,
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const maxImageSize = 2 * 1024 * 1024; // 2MB
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const errors = [];

  // 🔹 Validate image (optional, but check if provided)
  if (image) {
    if (!allowedImageTypes.includes(image.mimetype)) {
      errors.push('Only JPEG, JPG, or PNG images allowed for event image.');
    }
    if (image.size > maxImageSize) {
      errors.push('Event image must not exceed 2MB.');
    }
  }

  // 🔹 Validate attachments (optional)
  attachments.forEach((file) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
      errors.push(`File ${file.originalname} has an unsupported format.`);
    }
    if (file.size > maxFileSize) {
      errors.push(`File ${file.originalname} exceeds 10MB limit.`);
    }
  });

  if (errors.length > 0) {
    return next(new AppError(errors.join(' '), 400));
  }

  next();
};


/**
 * Validate user registration
 */
exports.validateRegistration = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const errors = [];

  const validRoles = ['admin', 'organizer', 'participant'];
  if (role && !validRoles.includes(role)) {
    errors.push('Invalid role. Allowed roles are admin, organizer, or participant');
  }

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join('. '), 400));
  }

  next();
};

/**
 * Validate login
 */
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  next();
};
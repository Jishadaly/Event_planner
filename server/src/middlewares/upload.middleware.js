const multer = require('multer');

// Store files in memory (so you can upload to S3)
const storage = multer.memoryStorage();

// Allow multiple file types (images, PDFs, docs, etc.)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and documents are allowed'));
  }
};

// Set upload limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'attachments', maxCount: 3 },
])

module.exports = upload;

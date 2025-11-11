const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload buffer (from multer memoryStorage) to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, folder, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename ? filename.split('.')[0] : undefined,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          name: result.original_filename,
          url: result.secure_url,
          type: result.resource_type,
          size: result.bytes,
          public_id: result.public_id,
        });
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Delete file from Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  } catch (err) {
    console.error('Cloudinary delete error:', err.message);
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};

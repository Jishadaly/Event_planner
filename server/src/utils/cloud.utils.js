const { Readable } = require('stream');
const { cloud: cloudinary } = require('../config/cloudinary');

//upload
const uploadToCloudinary = (fileBuffer, folder, filename) => {
  console.filename("filename", filename)
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

//delete
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

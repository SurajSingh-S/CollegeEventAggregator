import { uploadImage as cloudinaryUpload, deleteImage as cloudinaryDelete } from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import fs from 'fs';



export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image file provided'
    });
  }

  try {
    const result = await cloudinaryUpload(req.file, 'college-events/general');
    
    // Clean up local file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.url,
        publicId: result.publicId
      }
    });
  } catch (error) {
    // Clean up local file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    return res.status(400).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});




export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  if (!publicId) {
    return res.status(400).json({
      success: false,
      message: 'Public ID is required'
    });
  }

  try {
    await cloudinaryDelete(publicId);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Image deletion failed',
      error: error.message
    });
  }
});
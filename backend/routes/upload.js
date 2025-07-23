import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

// Protected routes
router.post('/image', protect, uploadSingle('image'), uploadImage);
router.delete('/image/:publicId', protect, deleteImage);

export default router;
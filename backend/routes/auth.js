import express from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';
import { 
  validateUserRegistration, 
  validateUserLogin, 
  validateProfileUpdate 
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', uploadSingle('profileImage'), validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, uploadSingle('profileImage'), validateProfileUpdate, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
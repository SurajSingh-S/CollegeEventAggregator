// import express from 'express';
// import { 
//   register, 
//   login, 
//   getProfile, 
//   updateProfile, 
//   changePassword 
// } from '../controllers/authController.js';
// import { protect } from '../middleware/auth.js';
// import { uploadSingle } from '../middleware/upload.js';
// import { 
//   validateUserRegistration, 
//   validateUserLogin, 
//   validateProfileUpdate 
// } from '../middleware/validation.js';

// const router = express.Router();

// // Public routes
// router.post('/register', uploadSingle('profileImage'), validateUserRegistration, register);
// router.post('/login', validateUserLogin, login);

// // Protected routes
// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, uploadSingle('profileImage'), validateProfileUpdate, updateProfile);
// router.put('/change-password', protect, changePassword);

// export default router;



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
router.post(
  '/register',
  validateUserRegistration,  // Validate first
  uploadSingle('profileImage'),  // Then handle file upload
  (req, res, next) => { 
    console.log("Register -> Body:", req.body);
    console.log("Register -> File:", req.file);
    next();
  },
  register
);

router.post('/login', validateUserLogin, login);

// Protected routes
router.get('/profile', protect, getProfile);

router.put(
  '/profile',
  protect,
  validateProfileUpdate,
  uploadSingle('profileImage'),
  (req, res, next) => { 
    console.log("Profile Update -> Body:", req.body);
    console.log("Profile Update -> File:", req.file);
    next();
  },
  updateProfile
);

router.put('/change-password', protect, changePassword);

export default router;

import { body, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

   if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .isIn(['student', 'admin'])
    .withMessage('Role must be either student or admin'),
  
  // Conditional validation for student fields
  body('college')
    .if(body('role').equals('student'))
    .trim()
    .notEmpty()
    .withMessage('College is required for students'),
  
  body('course')
    .if(body('role').equals('student'))
    .trim()
    .notEmpty()
    .withMessage('Course is required for students'),
  
  body('year')
    .if(body('role').equals('student'))
    .isIn(['1', '2', '3', '4'])
    .withMessage('Year must be 1, 2, 3, or 4'),
  
  // Admin code validation
  body('adminCode')
    .if(body('role').equals('admin'))
    .notEmpty()
    .withMessage('Admin code is required for admin registration'),
  
  handleValidationErrors
];

// User login validation
export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];



// middleware/validation.js

export const validateEventCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg, // Show first error
      });
    }
    next();
  }
];



// Event update validation
export const validateEventUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error('Event date cannot be in the past');
      }
      return true;
    }),
  
  body('time')
    .optional()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time format (HH:MM)'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Location must be between 1 and 200 characters'),
  
  body('category')
    .optional()
    .isIn(['Academic', 'Cultural', 'Sports', 'Technical', 'Social', 'Workshop', 'Seminar', 'Competition'])
    .withMessage('Please provide a valid category'),
  
  body('capacity')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Capacity must be between 1 and 1000'),
  
  handleValidationErrors
];

// Profile update validation
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('college')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('College cannot be empty'),
  
  body('course')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Course cannot be empty'),
  
  body('year')
    .optional()
    .isIn(['1', '2', '3', '4'])
    .withMessage('Year must be 1, 2, 3, or 4'),
  
  handleValidationErrors
];
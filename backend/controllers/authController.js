import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { uploadProfileImage } from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import fs from 'fs';
import bcrypt from 'bcryptjs';



export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, college, course, year, adminCode } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Validate admin code for admin registration
  if (role === 'admin') {
    if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
      return res.status(400).json({
        success: false,
        message: 'Invalid admin code'
      });
    }
  }

  // Handle profile image upload
  let profileImage = '';
  if (req.file) {
    try {
      const result = await uploadProfileImage(req.file);
      profileImage = result.url;
      
      // Clean up local file
      fs.unlinkSync(req.file.path);
    } catch (error) {
      // Clean up local file on error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Profile image upload failed'
      });
    }
  }

  // Create user data
  const userData = {
    name,
    email,
    password,
    role,
    profileImage
  };

  // Add student-specific fields
  if (role === 'student') {
    userData.college = college;
    userData.course = course;
    userData.year = year;
  }

  // Create user
  const user = await User.create(userData);

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      college: user.college,
      course: user.course,
      year: user.year
    }
  });
});




export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if account is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Update last login
  user.lastLogin = Date.now();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      college: user.college,
      course: user.course,
      year: user.year
    }
  });
});





export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      college: user.college,
      course: user.course,
      year: user.year,
      lastLogin: user.lastLogin
    }
  });
});





export const updateProfile = asyncHandler(async (req, res) => {
  console.log(' Incoming profile update...');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  const { name, email, college, course, year } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });

    
  }

  // Check if email is changing and if already taken
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }
  }


  // Handle image upload if provided
  let profileImage = user.profileImage;
  if (req.file) {
    try {
      const result = await uploadProfileImage(req.file);
      profileImage = result.url;

      // Remove local uploaded file
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error(' Cloudinary upload error:', error.message);
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Profile image upload failed'
      });
    }
  }

  // Update fields
  user.name = name || user.name;
  user.email = email || user.email;
  user.profileImage = profileImage;

  if (user.role === 'student') {
    user.college = college || user.college;
    user.course = course || user.course;
    user.year = year || user.year;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      college: updatedUser.college,
      course: updatedUser.course,
      year: updatedUser.year,
      role: updatedUser.role
    }
  });
});




export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 6 characters long'
    });
  }

  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});
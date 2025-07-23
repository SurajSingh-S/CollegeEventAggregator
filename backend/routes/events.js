import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  getUserEvents,
  getAdminEvents,
  getEventAttendees
} from '../controllers/eventController.js';
import { protect, adminOnly, studentOnly } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';
import { validateEventCreation, validateEventUpdate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, adminOnly, uploadSingle('image'), validateEventCreation, createEvent);
router.put('/:id', protect, adminOnly, uploadSingle('image'), validateEventUpdate, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

// Student routes
router.post('/:id/rsvp', protect, studentOnly, rsvpEvent);
router.get('/user/registered', protect, studentOnly, getUserEvents);

// Admin routes
router.get('/admin/my-events', protect, adminOnly, getAdminEvents);
router.get('/:id/attendees', protect, adminOnly, getEventAttendees);

export default router;
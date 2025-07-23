import Event from '../models/Event.js';
import User from '../models/User.js';
import { uploadImage } from '../config/cloudinary.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import fs from 'fs';



export const createEvent = asyncHandler(async (req, res) => {

  const { title, description, date, time, location, category, capacity } = req.body;

  // Handle image upload
  let imageUrl = '';
  if (req.file) {
    try {
      const result = await uploadImage(req.file, 'college-events/events');
      imageUrl = result.url;
      
      // Clean up local file
      fs.unlinkSync(req.file.path);
    } catch (error) {
      // Clean up local file on error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Image upload failed'
      });
    }
  }

  // Create event
  const event = await Event.create({
    title,
    description,
    date,
    time,
    location,
    category,
    capacity,
    image: imageUrl,
    creator: req.user._id
  });

  // Populate creator info
  await event.populate('creator', 'name email');

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: event
  });
});




export const getEvents = asyncHandler(async (req, res) => {
  const { search, category, location, sortBy, limit = 10, page = 1 } = req.query;

  // Build query
  let query = { isActive: true };

  // Search filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Location filter
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  // Sort options
  let sortOptions = {};
  switch (sortBy) {
    case 'date':
      sortOptions = { date: 1 };
      break;
    case 'title':
      sortOptions = { title: 1 };
      break;
    case 'category':
      sortOptions = { category: 1 };
      break;
    case 'attendees':
      sortOptions = { 'attendees.length': -1 };
      break;
    default:
      sortOptions = { date: 1 };
  }

  // Pagination
  const skip = (page - 1) * limit;

  const events = await Event.find(query)
    .populate('creator', 'name')
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Event.countDocuments(query);

  res.json({
    success: true,
    count: events.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    },
    data: events
  });
});




export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('creator', 'name email');

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  res.json({
    success: true,
    data: event
  });
});




export const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, time, location, category, capacity } = req.body;

  let event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  // Check if user is the creator of the event
  if (event.creator.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this event'
    });
  }

  // Handle image upload
  let imageUrl = event.image;
  if (req.file) {
    try {
      const result = await uploadImage(req.file, 'college-events/events');
      imageUrl = result.url;
      
      // Clean up local file
      fs.unlinkSync(req.file.path);
    } catch (error) {
      // Clean up local file on error
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Image upload failed'
      });
    }
  }

  // Update event
  event = await Event.findByIdAndUpdate(
    req.params.id,
    {
      title: title || event.title,
      description: description || event.description,
      date: date || event.date,
      time: time || event.time,
      location: location || event.location,
      category: category || event.category,
      capacity: capacity || event.capacity,
      image: imageUrl
    },
    { new: true, runValidators: true }
  ).populate('creator', 'name email');

  res.json({
    success: true,
    message: 'Event updated successfully',
    data: event
  });
});




export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  // Check if user is the creator of the event
  if (event.creator.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this event'
    });
  }

  await Event.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});




export const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  // Check if registration is still open
  if (new Date() > event.registrationDeadline) {
    return res.status(400).json({
      success: false,
      message: 'Registration deadline has passed'
    });
  }

  const isRegistered = event.attendees.includes(req.user._id);

  if (isRegistered) {
    // Remove user from attendees (unregister)
    event.attendees = event.attendees.filter(id => !id.equals(req.user._id));
    await event.save();

    res.json({
      success: true,
      message: 'Successfully unregistered from event',
      data: event
    });
  } else {
    // Check if event is full
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Add user to attendees (register)
    event.attendees.push(req.user._id);
    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for event',
      data: event
    });
  }
});




export const getUserEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    attendees: req.user._id,
    isActive: true
  })
  .populate('creator', 'name')
  .sort({ date: 1 });

  res.json({
    success: true,
    count: events.length,
    data: events
  });
});




export const getAdminEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    creator: req.user._id,
    isActive: true
  })
  .populate('creator', 'name')
  .sort({ date: 1 });

  res.json({
    success: true,
    count: events.length,
    data: events
  });
});




export const getEventAttendees = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('attendees', 'name email college course year');

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }

  // Check if user is the creator of the event
  if (event.creator.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view attendees'
    });
  }

  res.json({
    success: true,
    count: event.attendees.length,
    data: event.attendees
  });
});
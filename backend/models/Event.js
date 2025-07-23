import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        return value >= new Date();
      },
      message: 'Event date cannot be in the past'
    }
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: [
      'Academic',
      'Cultural',
      'Sports',
      'Technical',
      'Social',
      'Workshop',
      'Seminar',
      'Competition'
    ]
  },
  capacity: {
    type: Number,
    required: [true, 'Event capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [1000, 'Capacity cannot exceed 1000']
  },
  image: {
    type: String,
    default: ''
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  registrationDeadline: {
    type: Date,
    default: function() {
      return this.date;
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ creator: 1 });
eventSchema.index({ title: 'text', description: 'text' });

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.attendees.length;
});

// Virtual for registration status
eventSchema.virtual('isRegistrationOpen').get(function() {
  return new Date() < this.registrationDeadline && this.availableSpots > 0;
});

// Virtual for event status
eventSchema.virtual('status').get(function() {
  const now = new Date();
  const eventDate = new Date(this.date);
  
  if (eventDate < now) {
    return 'completed';
  } else if (eventDate.toDateString() === now.toDateString()) {
    return 'today';
  } else {
    return 'upcoming';
  }
});

// Include virtuals in JSON output
eventSchema.set('toJSON', { virtuals: true });

// Pre-save middleware
eventSchema.pre('save', function(next) {
  // Set registration deadline to event date if not specified
  if (!this.registrationDeadline) {
    this.registrationDeadline = this.date;
  }
  next();
});

// Static method to get upcoming events
eventSchema.statics.getUpcomingEvents = function(limit = 10) {
  return this.find({
    date: { $gte: new Date() },
    isActive: true
  })
  .populate('creator', 'name')
  .sort({ date: 1 })
  .limit(limit);
};

// Static method to get events by category
eventSchema.statics.getEventsByCategory = function(category, limit = 10) {
  return this.find({
    category: category,
    date: { $gte: new Date() },
    isActive: true
  })
  .populate('creator', 'name')
  .sort({ date: 1 })
  .limit(limit);
};

// Instance method to add attendee
eventSchema.methods.addAttendee = function(userId) {
  if (!this.attendees.includes(userId)) {
    this.attendees.push(userId);
  }
  return this.save();
};

// Instance method to remove attendee
eventSchema.methods.removeAttendee = function(userId) {
  this.attendees = this.attendees.filter(id => !id.equals(userId));
  return this.save();
};

// Instance method to check if user is registered
eventSchema.methods.isUserRegistered = function(userId) {
  return this.attendees.some(id => id.equals(userId));
};

const Event = mongoose.model('Event', eventSchema);

export default Event;
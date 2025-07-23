import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Upload, X, Calendar, MapPin, Users, Clock, Tag, FileText } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

const EventForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [eventDate, setEventDate] = useState(
    initialData?.date ? new Date(initialData.date) : new Date()
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      category: '',
      location: '',
      capacity: 50,
      time: '09:00',
    },
  });

  const categories = [
    'Academic',
    'Cultural',
    'Sports',
    'Technical',
    'Social',
    'Workshop',
    'Seminar',
    'Competition'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    
    // Add form fields
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    // Add date
    formData.append('date', eventDate.toISOString());
    
    // Add image if selected
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline w-4 h-4 mr-1" />
          Event Title *
        </label>
        <input
          type="text"
          {...register('title', {
            required: 'Event title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long'
            }
          })}
          className="input-field"
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          {...register('description', {
            required: 'Event description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters long'
            }
          })}
          rows={4}
          className="input-field"
          placeholder="Describe your event..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Category and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="inline w-4 h-4 mr-1" />
            Category *
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="input-field"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location *
          </label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="input-field"
            placeholder="Event location"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Date *
          </label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            className="input-field"
            placeholderText="Select date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Time *
          </label>
          <input
            type="time"
            {...register('time', { required: 'Time is required' })}
            className="input-field"
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Users className="inline w-4 h-4 mr-1" />
          Capacity *
        </label>
        <input
          type="number"
          {...register('capacity', {
            required: 'Capacity is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1'
            },
            max: {
              value: 1000,
              message: 'Capacity cannot exceed 1000'
            }
          })}
          className="input-field"
          placeholder="Maximum attendees"
        />
        {errors.capacity && (
          <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Upload className="inline w-4 h-4 mr-1" />
          Event Image
        </label>
        
        {imagePreview ? (
          <div className="relative mb-4">
            <img
              src={imagePreview}
              alt="Event preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Upload an image for your event
            </p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary min-w-32"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            initialData ? 'Update Event' : 'Create Event'
          )}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Tag,
  ArrowLeft,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  User
} from 'lucide-react';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { currentEvent, getEventById, toggleRSVP, deleteEvent, loading } = useEvent();
  const [isRSVPLoading, setIsRSVPLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  const isRegistered = currentEvent?.attendees?.includes(user?._id);
  const isEventFull = currentEvent?.attendees?.length >= currentEvent?.capacity;
  const isOwner = user?._id === currentEvent?.creator?._id;

  const handleRSVP = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsRSVPLoading(true);
    try {
      await toggleRSVP(id);
    } catch (error) {
      console.error('RSVP failed:', error);
    } finally {
      setIsRSVPLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        navigate('/admin/dashboard');
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Event Not Found
            </h1>
            <Link to="/events" className="btn-primary">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Event Image */}
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative">
            {currentEvent.image ? (
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-24 h-24 text-primary-300" />
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentEvent.category}
              </span>
            </div>

            {/* Admin Actions */}
            {isOwner && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link
                  to={`/admin/events/edit/${currentEvent._id}`}
                  className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-white/90 hover:bg-white text-red-600 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Event Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {currentEvent.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentEvent.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                  <span className="font-medium">
                    {currentEvent.date && !isNaN(new Date(currentEvent.date)) ? (
                      format(new Date(currentEvent.date), 'MMM dd, yyyy')
                    ) : (
                      'Date not available'
                    )}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-primary-600" />
                  <span className="font-medium">{currentEvent.time}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                  <span className="font-medium">{currentEvent.location}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Tag className="w-5 h-5 mr-3 text-primary-600" />
                  <span className="font-medium">{currentEvent.category}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-3 text-primary-600" />
                  <span className="font-medium">
                    {currentEvent.attendees?.length || 0} / {currentEvent.capacity} attendees
                  </span>
                </div>
                {currentEvent.creator && (
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-primary-600" />
                    <span className="font-medium">
                      Created by {currentEvent.creator.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Capacity Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Event Capacity
                </span>
                <span className="text-sm text-gray-600">
                  {currentEvent.attendees?.length || 0} / {currentEvent.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentEvent.attendees?.length || 0) / currentEvent.capacity) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated && user?.role === 'student' && (
                <button
                  onClick={handleRSVP}
                  disabled={isRSVPLoading || (!isRegistered && isEventFull)}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${isRegistered
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : isEventFull
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                >
                  {isRSVPLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isRegistered ? (
                    <>
                      <UserMinus className="w-5 h-5" />
                      <span>Unregister</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>{isEventFull ? 'Event Full' : 'Register'}</span>
                    </>
                  )}
                </button>
              )}

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Login to Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
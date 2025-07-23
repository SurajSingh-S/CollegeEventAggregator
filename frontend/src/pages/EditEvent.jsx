import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import EventForm from '../components/events/EventForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeft, Edit } from 'lucide-react';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent, getEventById, updateEvent, loading } = useEvent();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        await getEventById(id);
      } catch (error) {
        console.error('Failed to load event:', error);
        navigate('/admin/dashboard');
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateEvent(id, formData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Event update failed:', error);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Event Not Found
            </h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 rounded-full">
              <Edit className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Edit Event
              </h1>
              <p className="text-gray-600 mt-1">
                Update the details of your event
              </p>
            </div>
          </div>
        </div>

        {/* Event Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <EventForm
            onSubmit={handleSubmit}
            initialData={currentEvent}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
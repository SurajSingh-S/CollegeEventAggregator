import { useNavigate } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import EventForm from '../components/events/EventForm';
import { ArrowLeft, Plus } from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent, loading } = useEvent();

  const handleSubmit = async (formData) => {
    try {
      await createEvent(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Event creation failed:', error);
    }
  };

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
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Create New Event
              </h1>
              <p className="text-gray-600 mt-1">
                Fill in the details to create a new campus event
              </p>
            </div>
          </div>
        </div>

        {/* Event Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <EventForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
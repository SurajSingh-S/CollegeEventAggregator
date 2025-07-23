import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Calendar } from 'lucide-react';

const Events = () => {
  const location = useLocation();
  const { events, getEvents, loading } = useEvent();
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Get initial category from URL params
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || '';

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleFilterChange = (filters) => {
    let filtered = [...events];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(event =>
        event.category === filters.category
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'attendees':
        filtered.sort((a, b) => (b.attendees?.length || 0) - (a.attendees?.length || 0));
        break;
      default:
        break;
    }

    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Campus Events
          </h1>
          <p className="text-gray-600">
            Discover and register for upcoming events at your college
          </p>
        </div>

        <EventFilters
          onFilterChange={handleFilterChange}
          initialFilters={{ category: initialCategory }}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No Events Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new events.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
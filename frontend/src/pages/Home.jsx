import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Calendar, Users, Award, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const { events, getEvents, loading } = useEvent();
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      // Get the latest 3 events as featured
      const featured = events.slice(0, 3);
      setFeaturedEvents(featured);
    }
  }, [events]);

  const stats = [
    { icon: Calendar, label: 'Total Events', value: events.length },
    { icon: Users, label: 'Active Students', value: '2,500+' },
    { icon: Award, label: 'Categories', value: '8+' },
    { icon: Sparkles, label: 'This Month', value: events.filter(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Discover Amazing
              <span className="block text-accent-300">Campus Events</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 animate-slide-up">
              Join thousands of students in exciting academic seminars, cultural events, 
              sports competitions, and social gatherings at your college.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/events"
                    className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
                  >
                    <span>Explore Events</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin/events/create"
                      className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                    >
                      <span>Create Event</span>
                      <Calendar className="w-5 h-5" />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/events"
                    className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Browse Events</span>
                    <Calendar className="w-5 h-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Events
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss these upcoming exciting events
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="xl" />
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No events available at the moment.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/events"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Event Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find events that match your interests
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Academic', color: 'bg-blue-100 text-blue-800' },
              { name: 'Cultural', color: 'bg-purple-100 text-purple-800' },
              { name: 'Sports', color: 'bg-green-100 text-green-800' },
              { name: 'Technical', color: 'bg-orange-100 text-orange-800' },
              { name: 'Social', color: 'bg-pink-100 text-pink-800' },
              { name: 'Workshop', color: 'bg-indigo-100 text-indigo-800' },
              { name: 'Seminar', color: 'bg-teal-100 text-teal-800' },
              { name: 'Competition', color: 'bg-red-100 text-red-800' },
            ].map((category) => (
              <div
                key={category.name}
                to={`/events?category=${category.name}`}
                className={`${category.color} p-6 rounded-lg text-center font-medium hover:scale-105 transition-transform duration-200`}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 gradient-bg text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of students and discover amazing events happening at your college.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <span>Sign Up Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-3 rounded-lg transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
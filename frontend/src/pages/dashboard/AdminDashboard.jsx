import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import EventCard from '../../components/events/EventCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Calendar, Plus, Users, BarChart3, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { userEvents, getAdminEvents, loading } = useEvent();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    getAdminEvents();
  }, []);

  useEffect(() => {
    if (userEvents.length > 0) {
      const now = new Date();
      const upcoming = userEvents.filter(event => new Date(event.date) >= now);
      const past = userEvents.filter(event => new Date(event.date) < now);
      
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
  }, [userEvents]);

  const totalAttendees = userEvents.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);
  const averageAttendance = userEvents.length > 0 ? Math.round(totalAttendees / userEvents.length) : 0;

  const stats = [
    {
      icon: Calendar,
      label: 'Total Events Created',
      value: userEvents.length,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      label: 'Total Attendees',
      value: totalAttendees,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: BarChart3,
      label: 'Average Attendance',
      value: averageAttendance,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Calendar,
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your events and view analytics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/events/create"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
            <Link
              to="/events"
              className="btn-outline flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View All Events</span>
            </Link>
            <Link
              to="/profile"
              className="btn-outline flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Account Settings</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="xl" />
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Your Upcoming Events
                </h2>
                <Link
                  to="/admin/events/create"
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </Link>
              </div>
              
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event._id} event={event} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You haven't created any upcoming events yet.
                  </p>
                  <Link
                    to="/admin/events/create"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Your First Event</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event._id} event={event} showActions={true} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
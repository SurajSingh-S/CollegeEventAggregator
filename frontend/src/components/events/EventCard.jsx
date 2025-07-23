// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useEvent } from '../../context/EventContext';
// import { Calendar, MapPin, Users, Clock, Edit, Trash2, UserPlus, UserMinus } from 'lucide-react';
// import { format } from 'date-fns';

// const EventCard = ({ event, showActions = false }) => {
//   const { user, isAuthenticated } = useAuth();
//   const { toggleRSVP, deleteEvent } = useEvent();
//   const [isRSVPLoading, setIsRSVPLoading] = useState(false);

//   const isRegistered = event.attendees?.includes(user?._id);
//   const isEventFull = event.attendees?.length >= event.capacity;
//   const isOwner = user?._id === event.creator?._id;

//   const handleRSVP = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!isAuthenticated) return;
    
//     setIsRSVPLoading(true);
//     try {
//       await toggleRSVP(event._id);
//     } catch (error) {
//       console.error('RSVP failed:', error);
//     } finally {
//       setIsRSVPLoading(false);
//     }
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (window.confirm('Are you sure you want to delete this event?')) {
//       try {
//         await deleteEvent(event._id);
//       } catch (error) {
//         console.error('Delete failed:', error);
//       }
//     }
//   };

//   return (
//     <div className="card animate-fade-in">
//       <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
//         {event.image ? (
//           <img
//             src={event.image || '/default-event.jpg'}
//             alt={event.title}
//             className="w-full h-full object-cover"
//               onError={(e) => { e.target.src = '/default-event.jpg'; }}

//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <Calendar className="w-16 h-16 text-primary-300" />
//           </div>
//         )}
        
//         {/* Event Category Badge */}
//         <div className="absolute top-4 left-4">
//           <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
//             {event.category}
//           </span>
//         </div>

//         {/* Admin Actions */}
//         {showActions && isOwner && (
//           <div className="absolute top-4 right-4 flex space-x-2">
//             <Link
//               to={`/admin/events/edit/${event._id}`}
//               className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg transition-colors"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Edit className="w-4 h-4" />
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="bg-white/90 hover:bg-white text-red-600 p-2 rounded-lg transition-colors"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
//             {event.title}
//           </h3>
//           {isEventFull && (
//             <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
//               Full
//             </span>
//           )}
//         </div>

//         <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-sm text-gray-500">
//             <Calendar className="w-4 h-4 mr-2" />
//             {event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'Date not available'}
//           </div>
//           <div className="flex items-center text-sm text-gray-500">
//             <Clock className="w-4 h-4 mr-2" />
//             {event.time}
//           </div>
//           <div className="flex items-center text-sm text-gray-500">
//             <MapPin className="w-4 h-4 mr-2" />
//             {event.location}
//           </div>
//           <div className="flex items-center text-sm text-gray-500">
//             <Users className="w-4 h-4 mr-2" />
//             {event.attendees?.length || 0} / {event.capacity} attendees
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <Link
//             to={`/events/${event._id}`}
//             className="btn-outline text-sm"
//           >
//             View Details
//           </Link>

//           {isAuthenticated && user?.role === 'student' && (
//             <button
//               onClick={handleRSVP}
//               disabled={isRSVPLoading || (!isRegistered && isEventFull)}
//               className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                 isRegistered
//                   ? 'bg-red-600 hover:bg-red-700 text-white'
//                   : isEventFull
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-primary-600 hover:bg-primary-700 text-white'
//               }`}
//             >
//               {isRSVPLoading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : isRegistered ? (
//                 <>
//                   <UserMinus className="w-4 h-4" />
//                   <span>Unregister</span>
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-4 h-4" />
//                   <span>Register</span>
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// export default EventCard;



















import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvent } from '../../context/EventContext';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Edit,
  Trash2,
  UserPlus,
  UserMinus
} from 'lucide-react';
import { format } from 'date-fns';

// Helper to normalize image URLs
const API_ORIGIN = window.location.origin;
const getImageUrl = (img) => {
  if (!img) return '/default-event.jpg'; // fallback if no image
  if (/^https?:\/\//i.test(img)) return img; // already a full URL (e.g., Cloudinary)
  return `${API_ORIGIN}/${img.startsWith('/') ? img.slice(1) : img}`;
};

const EventCard = ({ event, showActions = false }) => {
  const { user, isAuthenticated } = useAuth();
  const { toggleRSVP, deleteEvent } = useEvent();
  const [isRSVPLoading, setIsRSVPLoading] = useState(false);

  const isRegistered = event.attendees?.includes(user?._id);
  const isEventFull = event.attendees?.length >= event.capacity;
  const isOwner = user?._id === event.creator?._id;

  const handleRSVP = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    setIsRSVPLoading(true);
    try {
      await toggleRSVP(event._id);
    } catch (error) {
      console.error('RSVP failed:', error);
    } finally {
      setIsRSVPLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(event._id);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className="card animate-fade-in">
      {/* Event Image */}
      <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
        {event.image ? (
          <img
            src={getImageUrl(event.image)}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null; // prevent infinite loop
              e.currentTarget.src = '/default-event.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary-300" />
          </div>
        )}

        {/* Event Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Admin Actions */}
        {showActions && isOwner && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              to={`/admin/events/edit/${event._id}`}
              className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDelete}
              className="bg-white/90 hover:bg-white text-red-600 p-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {event.title}
          </h3>
          {isEventFull && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              Full
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'Date not available'}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {event.time || 'Time not specified'}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location || 'Location not specified'}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees?.length || 0} / {event.capacity} attendees
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link to={`/events/${event._id}`} className="btn-outline text-sm">
            View Details
          </Link>

          {isAuthenticated && user?.role === 'student' && (
            <button
              onClick={handleRSVP}
              disabled={isRSVPLoading || (!isRegistered && isEventFull)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isRegistered
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : isEventFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isRSVPLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isRegistered ? (
                <>
                  <UserMinus className="w-4 h-4" />
                  <span>Unregister</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

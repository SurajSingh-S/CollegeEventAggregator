// import { createContext, useContext, useReducer } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const EventContext = createContext();

// const initialState = {
//   events: [],
//   userEvents: [],
//   currentEvent: null,
//   loading: false,
//   error: null,
// };

// const eventReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     case 'SET_ERROR':
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     case 'SET_EVENTS':
//       return {
//         ...state,
//         events: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'SET_USER_EVENTS':
//       return {
//         ...state,
//         userEvents: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'SET_CURRENT_EVENT':
//       return {
//         ...state,
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'ADD_EVENT':
//       return {
//         ...state,
//         events: [action.payload, ...state.events],
//         loading: false,
//         error: null,
//       };
//     case 'UPDATE_EVENT':
//       return {
//         ...state,
//         events: state.events.map(event =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'DELETE_EVENT':
//       return {
//         ...state,
//         events: state.events.filter(event => event._id !== action.payload),
//         loading: false,
//         error: null,
//       };
//     case 'TOGGLE_RSVP':
//       return {
//         ...state,
//         events: state.events.map(event =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const EventProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(eventReducer, initialState);

//   const setLoading = (loading) => {
//     dispatch({ type: 'SET_LOADING', payload: loading });
//   };

//   const setError = (error) => {
//     dispatch({ type: 'SET_ERROR', payload: error });
//   };

//   const getEvents = async (searchParams = {}) => {
//     try {
//       setLoading(true);
//       const queryString = new URLSearchParams(searchParams).toString();
//       const res = await axios.get(`/api/events?${queryString}`);
//       dispatch({ type: 'SET_EVENTS', payload: res.data.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch events');
//     }
//   };

//   const getEventById = async (id) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/events/${id}`);
//       dispatch({ type: 'SET_CURRENT_EVENT', payload: res.data });
//       return res.data;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch event');
//       throw error;
//     }
//   };

//   const createEvent = async (formData) => {
//     try {
//       setLoading(true);
//       const res = await axios.post('/api/events', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       dispatch({ type: 'ADD_EVENT', payload: res.data });
//       toast.success('Event created successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const updateEvent = async (id, formData) => {
//     try {
//       setLoading(true);
//       const res = await axios.put(`/api/events/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       dispatch({ type: 'UPDATE_EVENT', payload: res.data });
//       toast.success('Event updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const deleteEvent = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/events/${id}`);
//       dispatch({ type: 'DELETE_EVENT', payload: id });
//       toast.success('Event deleted successfully!');
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to delete event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const toggleRSVP = async (id) => {
//     try {
//       const res = await axios.post(`/api/events/${id}/rsvp`);
//       dispatch({ type: 'TOGGLE_RSVP', payload: res.data });
//       toast.success(res.data.message || 'RSVP updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update RSVP';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const getUserEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/user/registered');
//       dispatch({ type: 'SET_USER_EVENTS', payload: res.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch user events');
//     }
//   };

//   const getAdminEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/admin/my-events');
//       dispatch({ type: 'SET_USER_EVENTS', payload: res.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch admin events');
//     }
//   };

//   const value = {
//     ...state,
//     getEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent,
//     toggleRSVP,
//     getUserEvents,
//     getAdminEvents,
//   };

//   return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
// };

// export const useEvent = () => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error('useEvent must be used within an EventProvider');
//   }
//   return context;
// };


// 22222222222222222222222222222222222222222222222222

// import { createContext, useContext, useReducer } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const EventContext = createContext();

// const initialState = {
//   events: [],
//   userEvents: [],
//   currentEvent: null,
//   loading: false,
//   error: null,
// };

// const eventReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     case 'SET_ERROR':
//       return {
//         ...state,
//         error: action.payload,
//         loading: false,
//       };
//     case 'SET_EVENTS':
//       return {
//         ...state,
//         events: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'SET_USER_EVENTS':
//       return {
//         ...state,
//         userEvents: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'SET_CURRENT_EVENT':
//       return {
//         ...state,
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'ADD_EVENT':
//       return {
//         ...state,
//         events: [action.payload, ...state.events],
//         loading: false,
//         error: null,
//       };
//     case 'UPDATE_EVENT':
//       return {
//         ...state,
//         events: state.events.map(event =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'DELETE_EVENT':
//       return {
//         ...state,
//         events: state.events.filter(event => event._id !== action.payload),
//         loading: false,
//         error: null,
//       };
//     case 'TOGGLE_RSVP':
//       return {
//         ...state,
//         events: state.events.map(event =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const EventProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(eventReducer, initialState);

//   const setLoading = (loading) => {
//     dispatch({ type: 'SET_LOADING', payload: loading });
//   };

//   const setError = (error) => {
//     dispatch({ type: 'SET_ERROR', payload: error });
//   };

//   const getEvents = async (searchParams = {}) => {
//     try {
//       setLoading(true);
//       const queryString = new URLSearchParams(searchParams).toString();
//       const res = await axios.get(`/api/events?${queryString}`);
//       dispatch({ type: 'SET_EVENTS', payload: res.data.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch events');
//     }
//   };

//   const getEventById = async (id) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/events/${id}`);
//       dispatch({ type: 'SET_CURRENT_EVENT', payload: res.data.data });
//       return res.data;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch event');
//       throw error;
//     }
//   };

//   const createEvent = async (formData) => {
//     try {
//       setLoading(true);
//       const res = await axios.post('/api/events', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       dispatch({ type: 'ADD_EVENT', payload: res.data });
//       toast.success('Event created successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const updateEvent = async (id, formData) => {
//     try {
//       setLoading(true);
//       const res = await axios.put(`/api/events/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       dispatch({ type: 'UPDATE_EVENT', payload: res.data.data });
//       toast.success('Event updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const deleteEvent = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/events/${id}`);
//       dispatch({ type: 'DELETE_EVENT', payload: id });
//       toast.success('Event deleted successfully!');
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to delete event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const toggleRSVP = async (id) => {
//     try {
//       const res = await axios.post(`/api/events/${id}/rsvp`);
//       dispatch({ type: 'TOGGLE_RSVP', payload: res.data });
//       toast.success(res.data.message || 'RSVP updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update RSVP';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const getUserEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/user/registered');
//       dispatch({ type: 'SET_USER_EVENTS', payload: res.data.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch user events');
//     }
//   };

//   const getAdminEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/admin/my-events');
//       dispatch({ type: 'SET_USER_EVENTS', payload: res.data.data });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch admin events');
//     }
//   };

//   const value = {
//     ...state,
//     getEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent,
//     toggleRSVP,
//     getUserEvents,
//     getAdminEvents,
//   };

//   return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
// };

// export const useEvent = () => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error('useEvent must be used within an EventProvider');
//   }
//   return context;
// };








// import { createContext, useContext, useReducer } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const EventContext = createContext();

// // Helper: Normalize image URLs
// const API_ORIGIN = window.location.origin;
// const normalizeImageUrl = (img) => {
//   if (!img) return '';
//   if (/^https?:\/\//i.test(img)) return img; // Cloudinary or external
//   return `${API_ORIGIN}/${img.startsWith('/') ? img.slice(1) : img}`;
// };

// const normalizeEvent = (evt) => ({
//   ...evt,
//   image: normalizeImageUrl(evt.image),
// });

// const initialState = {
//   events: [],
//   userEvents: [],
//   currentEvent: null,
//   loading: false,
//   error: null,
// };

// const eventReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, loading: action.payload };
//     case 'SET_ERROR':
//       return { ...state, error: action.payload, loading: false };
//     case 'SET_EVENTS':
//       return { ...state, events: action.payload, loading: false, error: null };
//     case 'SET_USER_EVENTS':
//       return { ...state, userEvents: action.payload, loading: false, error: null };
//     case 'SET_CURRENT_EVENT':
//       return { ...state, currentEvent: action.payload, loading: false, error: null };
//     case 'ADD_EVENT':
//       return { ...state, events: [action.payload, ...state.events], loading: false, error: null };
//     case 'UPDATE_EVENT':
//       return {
//         ...state,
//         events: state.events.map((event) =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     case 'DELETE_EVENT':
//       return {
//         ...state,
//         events: state.events.filter((event) => event._id !== action.payload),
//         loading: false,
//         error: null,
//       };
//     case 'TOGGLE_RSVP':
//       return {
//         ...state,
//         events: state.events.map((event) =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//         currentEvent: action.payload,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// export const EventProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(eventReducer, initialState);

//   const setLoading = (loading) => dispatch({ type: 'SET_LOADING', payload: loading });
//   const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error });

//   const getEvents = async (searchParams = {}) => {
//     try {
//       setLoading(true);
//       const queryString = new URLSearchParams(searchParams).toString();
//       const res = await axios.get(`/api/events?${queryString}`);
//       const normalized = res.data.data.map(normalizeEvent);
//       dispatch({ type: 'SET_EVENTS', payload: normalized });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch events');
//     }
//   };

//   const getEventById = async (id) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/events/${id}`);
//       const evt = normalizeEvent(res.data.data);
//       dispatch({ type: 'SET_CURRENT_EVENT', payload: evt });
//       return res.data;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch event');
//       throw error;
//     }
//   };

//   const createEvent = async (formData) => {
//     try {
//       setLoading(true);
//       // const res = await axios.post('/api/events', formData, {
//       //   // headers: { 'Content-Type': 'multipart/form-data' },
//       // });
//       dispatch({ type: 'ADD_EVENT', payload: normalizeEvent(res.data.data) });
//       toast.success('Event created successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const updateEvent = async (id, formData) => {
//     try {
//       setLoading(true);
//       const res = await axios.put(`/api/events/${id}`, formData, {
//         // headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       dispatch({ type: 'UPDATE_EVENT', payload: normalizeEvent(res.data.data) });
//       toast.success('Event updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const deleteEvent = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`/api/events/${id}`);
//       dispatch({ type: 'DELETE_EVENT', payload: id });
//       toast.success('Event deleted successfully!');
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to delete event';
//       toast.error(message);
//       setError(message);
//       throw error;
//     }
//   };

//   const toggleRSVP = async (id) => {
//     try {
//       const res = await axios.post(`/api/events/${id}/rsvp`);
//       dispatch({ type: 'TOGGLE_RSVP', payload: normalizeEvent(res.data.data) });
//       toast.success(res.data.message || 'RSVP updated successfully!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to update RSVP';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const getUserEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/user/registered');
//       const normalized = res.data.data.map(normalizeEvent);
//       dispatch({ type: 'SET_USER_EVENTS', payload: normalized });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch user events');
//     }
//   };

//   const getAdminEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/events/admin/my-events');
//       const normalized = res.data.data.map(normalizeEvent);
//       dispatch({ type: 'SET_USER_EVENTS', payload: normalized });
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to fetch admin events');
//     }
//   };

//   const value = {
//     ...state,
//     getEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent,
//     toggleRSVP,
//     getUserEvents,
//     getAdminEvents,
//   };

//   return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
// };

// export const useEvent = () => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error('useEvent must be used within an EventProvider');
//   }
//   return context;
// };





import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EventContext = createContext();

// Helper: Normalize image URLs
const API_ORIGIN = window.location.origin;
const normalizeImageUrl = (img) => {
  if (!img) return '';
  if (/^https?:\/\//i.test(img)) return img; // Cloudinary or external
  return `${API_ORIGIN}/${img.startsWith('/') ? img.slice(1) : img}`;
};
const normalizeEvent = (evt) => ({
  ...evt,
  image: normalizeImageUrl(evt.image),
});

const initialState = {
  events: [],
  userEvents: [],
  currentEvent: null,
  loading: false,
  error: null,
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_EVENTS':
      return { ...state, events: action.payload, loading: false, error: null };
    case 'SET_USER_EVENTS':
      return { ...state, userEvents: action.payload, loading: false, error: null };
    case 'SET_CURRENT_EVENT':
      return { ...state, currentEvent: action.payload, loading: false, error: null };
    case 'ADD_EVENT':
      return { ...state, events: [action.payload, ...state.events], loading: false, error: null };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        currentEvent: action.payload,
        loading: false,
        error: null,
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
        loading: false,
        error: null,
      };
    case 'TOGGLE_RSVP':
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        currentEvent: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const setLoading = (loading) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error });

  const getEvents = async (searchParams = {}) => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams(searchParams).toString();
      const res = await axios.get(`/api/events?${queryString}`);
      const normalized = res.data.data.map(normalizeEvent);
      dispatch({ type: 'SET_EVENTS', payload: normalized });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch events');
    }
  };

  const getEventById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/events/${id}`);
      const evt = normalizeEvent(res.data.data);
      dispatch({ type: 'SET_CURRENT_EVENT', payload: evt });
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch event');
      throw error;
    }
  };

  const createEvent = async (formData) => {
  try {
    setLoading(true);

    // Debugging
    if (formData instanceof FormData) {
      console.group('[EventContext] createEvent FormData entries');
      for (const [k, v] of formData.entries()) console.log(k, v);
      console.groupEnd();
    } else {
      console.warn('[EventContext] createEvent expected FormData, got:', formData);
    }

    const token = localStorage.getItem('token'); // Get JWT token
    const res = await axios.post('/api/events', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    console.log("Sending Event FormData:");
if (formData instanceof FormData) {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
}


    dispatch({ type: 'ADD_EVENT', payload: normalizeEvent(res.data.data) });
    toast.success('Event created successfully!');
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create event';
    toast.error(message);
    setError(message);
    throw error;
    
  }
};

  const updateEvent = async (id, formData) => {
    try {
      setLoading(true);

      if (formData instanceof FormData) {
        console.group('[EventContext] updateEvent FormData entries');
        for (const [k, v] of formData.entries()) console.log(k, v);
        console.groupEnd();
      }

      const res = await axios.put(`/api/events/${id}`, formData); // no manual headers!
      dispatch({ type: 'UPDATE_EVENT', payload: normalizeEvent(res.data.data) });
      toast.success('Event updated successfully!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update event';
      toast.error(message);
      setError(message);
      throw error;
    }
  };

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/events/${id}`);
      dispatch({ type: 'DELETE_EVENT', payload: id });
      toast.success('Event deleted successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete event';
      toast.error(message);
      setError(message);
      throw error;
    }
  };

  const toggleRSVP = async (id) => {
    try {
      const res = await axios.post(`/api/events/${id}/rsvp`);
      dispatch({ type: 'TOGGLE_RSVP', payload: normalizeEvent(res.data.data) });
      toast.success(res.data.message || 'RSVP updated successfully!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update RSVP';
      toast.error(message);
      throw error;
    }
  };

  const getUserEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/events/user/registered');
      const normalized = res.data.data.map(normalizeEvent);
      dispatch({ type: 'SET_USER_EVENTS', payload: normalized });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch user events');
    }
  };

  const getAdminEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/events/admin/my-events');
      const normalized = res.data.data.map(normalizeEvent);
      dispatch({ type: 'SET_USER_EVENTS', payload: normalized });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch admin events');
    }
  };

  const value = {
    ...state,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleRSVP,
    getUserEvents,
    getAdminEvents,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};


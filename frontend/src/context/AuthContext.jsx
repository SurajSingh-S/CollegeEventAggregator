// import { createContext, useContext, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// axios.defaults.baseURL = 
//   process.env.NODE_ENV === 'production'
//     ? '/api'
//     : 'http://localhost:5000/api';


// const AuthContext = createContext();

// // const initialState = {
// //   user: null,
// //   token: localStorage.getItem('token'),
// //   isAuthenticated: false,
// //   loading: true,
// // };


// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   token: localStorage.getItem('token') || null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   loading: true,
// };


// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'USER_LOADED':
//       return {
//         ...state,
//         user: action.payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case 'LOGIN_SUCCESS':
//     case 'REGISTER_SUCCESS':
//       localStorage.setItem('token', action.payload.token);
//       localStorage.setItem('user', JSON.stringify(action.payload.user));

//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case 'LOGOUT':
//     case 'AUTH_ERROR':
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');

//       return {
//         ...state,
//         user: null,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//       };
//     case 'CLEAR_LOADING':
//       return {
//         ...state,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   // Load user on app start
//  useEffect(() => {
//   if (state.user) {
//     localStorage.setItem('user', JSON.stringify(state.user));
//   }
// }, [state.user]);


//   // Set axios default header
//   useEffect(() => {
//     if (state.token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [state.token]);

//   const loadUser = async () => {
//     if (state.token) {
//       try {
//         const res = await axios.get('/api/auth/profile');
//         dispatch({ type: 'USER_LOADED', payload: res.data });
//       } catch (error) {
//         console.error('Error loading user:', error);
//         dispatch({ type: 'AUTH_ERROR' });
//       }
//     } else {
//       dispatch({ type: 'CLEAR_LOADING' });
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
//       toast.success('Login successful!');
//       return res.data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   // const register = async (formData) => {
//   //   try {
//   //     const res = await axios.post('/api/auth/register', formData);
//   //     dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
//   //     toast.success('Registration successful!');
//   //     return res.data;
//   //   } catch (error) {
//   //     const message = error.response?.data?.message || 'Registration failed';
//   //     toast.error(message);
//   //     throw error;
//   //   }
//   // };




//   const register = async (formData) => {
//   try {
//     const data = new FormData();

//     // Append non-file fields
//     Object.keys(formData).forEach((key) => {
//       if (key !== 'profileImage') {
//         data.append(key, formData[key]);
//       }
//     });

//     // Append file separately
//     if (formData.profileImage instanceof File) {
//       data.append('profileImage', formData.profileImage);
//     }

//     const res = await axios.post('/api/auth/register', data, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
//     toast.success('Registration successful!');
//     return res.data;
//   } catch (error) {
//     const message = error.response?.data?.message || 'Registration failed';
//     toast.error(message);
//     dispatch({ type: 'SET_ERROR', payload: message });
//     throw error;
//   }
// };







//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//     toast.success('Logged out successfully');
//   };

//   // const updateProfile = async (formData) => {
//   //   try {
//   //     const res = await axios.put('/api/auth/profile', formData, {
//   //       // headers: {
//   //       //   'Content-Type': 'multipart/form-data',
//   //       // },
//   //     });
//   //     dispatch({ type: 'USER_LOADED', payload: res.data.data });
//   //     toast.success('Profile updated successfully!');
//   //     return res.data;
//   //   } catch (error) {
//   //     const message = error.response?.data?.message || 'Profile update failed';
//   //     toast.error(message);
//   //     throw error;
//   //   }
//   // };





//   const updateProfile = async (formData) => {
//   try {
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] !== undefined && formData[key] !== null) {
//         data.append(key, formData[key]);
//       }
//     });

//     const res = await axios.put('/api/auth/profile', data, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     dispatch({ type: 'USER_LOADED', payload: res.data.user || res.data.data });
//     toast.success('Profile updated successfully!');
//     return res.data;
//   } catch (error) {
//     const message = error.response?.data?.message || 'Profile update failed';
//     toast.error(message);
//     dispatch({ type: 'SET_ERROR', payload: message });
//     throw error;
//   }
// };





//   const value = {
//     ...state,
//     login,
//     register,
//     logout,
//     updateProfile,
//     loadUser,
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, logout, loadUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };




// // import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // const AuthContext = createContext();

// // /**
// //  * Try to normalize backend responses:
// //  * - Some endpoints may return { user, token }
// //  * - /profile might return user directly OR { data: user }
// //  */
// // const extractUser = (raw) => {
// //   if (!raw) return null;
// //   if (raw.user) return raw.user;
// //   if (raw.data && raw.data.user) return raw.data.user;
// //   if (raw.data) return raw.data; // if backend wraps user in data
// //   return raw; // fallback
// // };

// // const initialState = {
// //   user: (() => {
// //     try {
// //       return JSON.parse(localStorage.getItem('user')) || null;
// //     } catch {
// //       return null;
// //     }
// //   })(),
// //   token: localStorage.getItem('token') || null,
// //   isAuthenticated: !!localStorage.getItem('token'),
// //   loading: true,
// //   error: null,
// // };

// // const authReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'USER_LOADED': {
// //       const user = extractUser(action.payload);
// //       return {
// //         ...state,
// //         user,
// //         isAuthenticated: true,
// //         loading: false,
// //         error: null,
// //       };
// //     }
// //     case 'LOGIN_SUCCESS':
// //     case 'REGISTER_SUCCESS': {
// //       const user = extractUser(action.payload);
// //       const token = action.payload.token;
// //       // Persist
// //       localStorage.setItem('token', token);
// //       localStorage.setItem('user', JSON.stringify(user));
// //       return {
// //         ...state,
// //         user,
// //         token,
// //         isAuthenticated: true,
// //         loading: false,
// //         error: null,
// //       };
// //     }
// //     case 'AUTH_ERROR':
// //     case 'LOGOUT': {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //       return {
// //         ...state,
// //         user: null,
// //         token: null,
// //         isAuthenticated: false,
// //         loading: false,
// //         error: action.type === 'AUTH_ERROR' ? (action.payload || 'Authentication error') : null,
// //       };
// //     }
// //     case 'CLEAR_LOADING':
// //       return { ...state, loading: false };
// //     case 'SET_ERROR':
// //       return { ...state, error: action.payload, loading: false };
// //     default:
// //       return state;
// //   }
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [state, dispatch] = useReducer(authReducer, initialState);
// //   const loadingUserRef = useRef(false); // avoid parallel profile fetches

// //   // Set / unset Authorization header whenever token changes
// //   useEffect(() => {
// //     if (state.token) {
// //       axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
// //     } else {
// //       delete axios.defaults.headers.common['Authorization'];
// //     }
// //   }, [state.token]);

// //   // Persist user if user object changes (e.g. profile update)
// //   useEffect(() => {
// //     if (state.user) {
// //       try {
// //         localStorage.setItem('user', JSON.stringify(state.user));
// //       } catch {
// //         /* ignore storage errors */
// //       }
// //     }
// //   }, [state.user]);

// //   // Load user on first mount
// //   useEffect(() => {
// //     loadUser();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   const loadUser = async () => {
// //     if (!state.token) {
// //       dispatch({ type: 'CLEAR_LOADING' });
// //       return;
// //     }
// //     if (loadingUserRef.current) return;
// //     loadingUserRef.current = true;
// //     try {
// //       const res = await axios.get('/api/auth/profile');
// //       dispatch({ type: 'USER_LOADED', payload: res.data });
// //     } catch (error) {
// //       console.error('Error loading user:', error);
// //       dispatch({
// //         type: 'AUTH_ERROR',
// //         payload: error.response?.data?.message || 'Failed to load user',
// //       });
// //     } finally {
// //       loadingUserRef.current = false;
// //     }
// //   };

// //   const login = async (email, password) => {
// //     try {
// //       const res = await axios.post('/api/auth/login', { email, password });
// //       dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
// //       toast.success('Login successful!');
// //       return res.data;
// //     } catch (error) {
// //       const message = error.response?.data?.message || 'Login failed';
// //       toast.error(message);
// //       dispatch({ type: 'SET_ERROR', payload: message });
// //       throw error;
// //     }
// //   };

// //   const register = async (formData) => {
// //     try {
// //       const res = await axios.post('/api/auth/register', formData);
// //       dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
// //       toast.success('Registration successful!');
// //       return res.data;
// //     } catch (error) {
// //       const message = error.response?.data?.message || 'Registration failed';
// //       toast.error(message);
// //       dispatch({ type: 'SET_ERROR', payload: message });
// //       throw error;
// //     }
// //   };

// //   const logout = () => {
// //     dispatch({ type: 'LOGOUT' });
// //     toast.success('Logged out successfully');
// //   };

// //   // const updateProfile = async (formData) => {
// //   //   try {
// //   //     const res = await axios.put('/api/auth/profile', formData);
// //   //     // Assume updated user at res.data or res.data.data
// //   //     dispatch({ type: 'USER_LOADED', payload: res.data });
// //   //     toast.success('Profile updated successfully!');
// //   //     return res.data;
// //   //   } catch (error) {
// //   //     const message = error.response?.data?.message || 'Profile update failed';
// //   //     toast.error(message);
// //   //     dispatch({ type: 'SET_ERROR', payload: message });
// //   //     throw error;
// //   //   }
// //   // };





// //   const updateProfile = async (formData) => {
// //   try {
// //     let payload;
// //     let config = {};

// //     if (formData.profileImage instanceof File) {
// //       // If profileImage is a file, use FormData
// //       payload = new FormData();
// //       Object.keys(formData).forEach((key) => {
// //         if (formData[key] !== undefined && formData[key] !== null) {
// //           payload.append(key, formData[key]);
// //         }
// //       });
// //       config.headers = { 'Content-Type': 'multipart/form-data' };
// //     } else {
// //       // If no file is present, still send FormData (multer expects multipart)
// //       payload = new FormData();
// //       Object.keys(formData).forEach((key) => {
// //         payload.append(key, formData[key]);
// //       });
// //       config.headers = { 'Content-Type': 'multipart/form-data' };
// //     }

// //     const res = await axios.put('/api/auth/profile', payload, config);
// //     dispatch({ type: 'USER_LOADED', payload: res.data.user || res.data.data });
// //     toast.success('Profile updated successfully!');
// //     return res.data;
// //   } catch (error) {
// //     const message = error.response?.data?.message || 'Profile update failed';
// //     toast.error(message);
// //     dispatch({ type: 'SET_ERROR', payload: message });
// //     throw error;
// //   }
// // };


// //   const value = {
// //     ...state,
// //     login,
// //     register,
// //     logout,
// //     updateProfile,
// //     loadUser,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => {
// //   const ctx = useContext(AuthContext);
// //   if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
// //   return ctx;
// // };
















import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL includes /api already
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:5000/api';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.type === 'AUTH_ERROR' ? (action.payload || 'Authentication error') : null,
      };
    case 'CLEAR_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const loadingUserRef = useRef(false);

  // Set or remove Authorization header when token changes
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Persist user data in localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }, [state.user]);

  // Load user on mount
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to load current logged-in user profile
  const loadUser = async () => {
    if (!state.token) {
      dispatch({ type: 'CLEAR_LOADING' });
      return;
    }
    if (loadingUserRef.current) return; // avoid parallel requests
    loadingUserRef.current = true;

    try {
      const res = await axios.get('/auth/profile');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (error) {
      console.error('Error loading user:', error);
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.response?.data?.message || 'Failed to load user',
      });
    } finally {
      loadingUserRef.current = false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      toast.success('Login successful!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const data = new FormData();

      // Append non-file fields
      Object.keys(formData).forEach((key) => {
        if (key !== 'profileImage') {
          data.append(key, formData[key]);
        }
      });

      // Append file if present
      if (formData.profileImage instanceof File) {
        data.append('profileImage', formData.profileImage);
      }

      const res = await axios.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      toast.success('Registration successful!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateProfile = async (formData) => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.put('/auth/profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch({ type: 'USER_LOADED', payload: res.data.user || res.data.data });
      toast.success('Profile updated successfully!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

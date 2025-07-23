// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import authRoutes from './routes/auth.js';
// import eventRoutes from './routes/events.js';
// import uploadRoutes from './routes/upload.js';
// import chatRoutes from './routes/chat.js';

// import { errorHandler } from './middleware/errorHandler.js';

// // Load environment variables
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Security middleware
// app.use(helmet());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api/', limiter);

// // Logging
// app.use(morgan('combined'));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // CORS
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true,
// }));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/chat', chatRoutes);


// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });


// // Error handling middleware
// app.use(errorHandler);



// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
// });




// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'API endpoint not found' });
// });

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };


// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//   });
// };

// startServer();

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.error('Unhandled Promise Rejection:', err);
//   process.exit(1);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
//   process.exit(1);
// });







// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import authRoutes from './routes/auth.js';
// import eventRoutes from './routes/events.js';
// import uploadRoutes from './routes/upload.js';
// import chatRoutes from './routes/chat.js';

// import { errorHandler } from './middleware/errorHandler.js';

// // Load environment variables
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Security middleware (with custom CSP)
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false, // Allow loading of images from other domains
//   })
// );

// // Add custom Content Security Policy
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//       fontSrc: ["'self'", "https://fonts.gstatic.com"],
//       connectSrc: [
//         "'self'",
//         "https://res.cloudinary.com",
//         'http://localhost:5173','http://localhost:5175','http://localhost:5174'
//       ],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   })
// );

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api/', limiter);

// // Logging
// app.use(morgan('combined'));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // CORS
// app.use(
//   cors({
//     // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//         // origin:['http://localhost:5173', 'http://localhost:5175','http://localhost:5174'],
//         origin:"https://collegeeventaggregator-10.onrender.com",

//     credentials: true,
//   })
// );

// // Serve static uploads
// // app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/chat', chatRoutes);

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Error handling middleware
// app.use(errorHandler);

// // Serve frontend (React build)
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'API endpoint not found' });
// });

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
//   });
// };

// startServer();

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.error('Unhandled Promise Rejection:', err);
//   process.exit(1);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
//   process.exit(1);
// });




import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';

import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", "https://res.cloudinary.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? function (origin, callback) {
        // Allow same-origin requests (no origin header) in production
        if (!origin) return callback(null, true);
        // Allow any origin since frontend and backend are on same domain
        callback(null, true);
      }
    : ['http://localhost:5173', 'http://localhost:5175', 'http://localhost:5174'],
  credentials: true,
};

app.use(cors(corsOptions));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware for API routes
app.use('/api/*', errorHandler);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  
  console.log('Serving static files from:', frontendPath);
  app.use(express.static(frontendPath));

  // Catch-all handler: serve React app for any non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Development mode - API only
  app.get('/', (req, res) => {
    res.json({ 
      message: 'College Events API is running in development mode',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        events: '/api/events',
        upload: '/api/upload',
        chat: '/api/chat'
      }
    });
  });
}

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

// Graceful error handling
process.on('unhandledRejection', (err) => {
  console.error(' Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(' Uncaught Exception:', err);
  process.exit(1);
});
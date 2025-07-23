# College Events Platform

A modern, full-stack web application for managing college events with role-based authentication. Students can discover and register for events, while admins can create and manage events.

## 🚀 Features

### Core Features
- **Role-Based Authentication**: Separate registration and login for students and admins
- **Event Discovery**: Browse events with advanced search and filtering
- **Event Management**: Admins can create, edit, and delete events
- **RSVP System**: Students can register/unregister for events
- **Real-time Updates**: Live event capacity and registration status
- **Image Upload**: Cloudinary integration for event and profile images
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Student Features
- Browse and search events
- Register/unregister for events
- Personal dashboard with registered events
- Profile management with image upload
- Event filtering by category, location, and date

### Admin Features
- Create and manage events
- Upload event images
- View event analytics and attendee lists
- Edit/delete own events
- Admin dashboard with statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - API calls
- **React Hook Form** - Form handling
- **React DatePicker** - Date selection
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload
- **Express Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd college-events-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   
   # Database
   MONGO_URI=mongodb://localhost:27017/college-events
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   
   # Admin Code
   ADMIN_CODE=your-admin-registration-code
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔧 Configuration

### MongoDB Setup
- **Local MongoDB**: Install MongoDB locally and use `mongodb://localhost:27017/college-events`
- **MongoDB Atlas**: Create a cluster and use the connection string

### Cloudinary Setup
1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these to your `.env` file

### Admin Registration
- Set a secure `ADMIN_CODE` in your `.env` file
- This code is required for admin registration

## 🚦 Usage

### For Students
1. Register with student role
2. Browse events on the homepage
3. Use filters to find relevant events
4. Register for events (RSVP)
5. View registered events in dashboard
6. Update profile information

### For Admins
1. Register with admin role (requires admin code)
2. Access admin dashboard
3. Create new events with images
4. Edit/delete your events
5. View event statistics and attendee lists

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Events
- `GET /api/events` - Get all events (with filters)
- `POST /api/events` - Create event (admin only)
- `GET /api/events/:id` - Get single event
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)
- `POST /api/events/:id/rsvp` - RSVP to event (student only)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary
- `DELETE /api/upload/image/:publicId` - Delete image

## 🔐 Security Features

- JWT token authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- File upload restrictions
- Rate limiting
- CORS configuration
- Helmet security headers

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  profileImage: String,
  college: String (student only),
  course: String (student only),
  year: String (student only),
  isActive: Boolean,
  lastLogin: Date
}
```

### Event Model
```javascript
{
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  category: String,
  capacity: Number,
  image: String,
  creator: ObjectId (User),
  attendees: [ObjectId] (Users),
  isActive: Boolean
}
```

## 🎨 UI Components

### Key Components
- **EventCard**: Displays event information with RSVP functionality
- **EventFilters**: Advanced filtering and search
- **EventForm**: Create/edit event form with image upload
- **Navbar**: Navigation with role-based menu items
- **Dashboard**: Separate dashboards for students and admins
- **ProtectedRoute**: Route protection middleware
- **AdminRoute**: Admin-only route protection

## 🚀 Deployment

### Backend Deployment
1. Set environment variables in your hosting platform
2. Build the application: `npm run build`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/college-events
JWT_SECRET=your-production-jwt-secret
ADMIN_CODE=your-production-admin-code
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MongoDB connection string
   - Ensure MongoDB is running
   - Verify network access for MongoDB Atlas

2. **Cloudinary Upload Error**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper file format

3. **Authentication Issues**
   - Check JWT secret configuration
   - Verify token expiration settings
   - Ensure proper CORS setup

4. **Admin Registration Failed**
   - Verify admin code in environment variables
   - Check if admin code matches during registration

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the documentation

## 🔄 Updates

Check the repository for regular updates and new features. To update:
1. Pull latest changes: `git pull origin main`
2. Install new dependencies: `npm install`
3. Update environment variables if needed
4. Restart the application

---

**Happy Coding! 🎉**
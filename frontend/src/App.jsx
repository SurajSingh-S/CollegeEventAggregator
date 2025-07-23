// import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { EventProvider } from './context/EventContext';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import Home from './pages/Home';
// import Events from './pages/Events';
// import EventDetails from './pages/EventDetails';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import StudentDashboard from './pages/dashboard/StudentDashboard';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import CreateEvent from './pages/CreateEvent';
// import EditEvent from './pages/EditEvent';
// import Profile from './pages/Profile';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import AdminRoute from './components/auth/AdminRoute';
// import ChatBot from './components/common/ChatBot';

// function App() {
//   return (
//     <AuthProvider>
//       <EventProvider>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <main className="flex-1">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/events" element={<Events />} />
//               <Route path="/events/:id" element={<EventDetails />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               {/* Protected Routes */}
//               <Route 
//                 path="/dashboard" 
//                 element={
//                   <ProtectedRoute>
//                     <StudentDashboard />
//                   </ProtectedRoute>
//                 } 
//               />
//               <Route 
//                 path="/profile" 
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 } 
//               />
              
//               {/* Admin Routes */}
//               <Route 
//                 path="/admin/dashboard" 
//                 element={
//                   <AdminRoute>
//                     <AdminDashboard />
//                   </AdminRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/events/create" 
//                 element={
//                   <AdminRoute>
//                     <CreateEvent />
//                   </AdminRoute>
//                 } 
//               />
//               <Route 
//                 path="/admin/events/edit/:id" 
//                 element={
//                   <AdminRoute>
//                     <EditEvent />
//                   </AdminRoute>
//                 } 
//               />

//             {/* <Route path="/chat" element={<ChatBot />} /> */}

//             </Routes>
//           </main>

//           <div className="fixed bottom-4 right-4 z-50 shadow-lg">
//             <ChatBot />
//           </div>

//           <Footer />
//         </div>
//       </EventProvider>
//     </AuthProvider>
//   );
// }

// export default App;






import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import AppRoutes from './AppRoutes'; // We'll move routing logic there

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <AppRoutes />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;

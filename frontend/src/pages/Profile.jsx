// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useForm } from 'react-hook-form';
// import { User, Mail, GraduationCap, Upload, X, Save } from 'lucide-react';

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(user?.profileImage || '');
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: user?.name || '',
//       email: user?.email || '',
//       college: user?.college || '',
//       course: user?.course || '',
//       year: user?.year || '',
//     },
//   });

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setSelectedImage(null);
//     setImagePreview(user?.profileImage || '');
//   };

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     try {
//       const formData = new FormData();

//       // Add form fields
//       Object.keys(data).forEach(key => {
//         formData.append(key, data[key]);
//       });

//       // Add profile image if selected
//       if (selectedImage) {
//         formData.append('profileImage', selectedImage);
//       }

//       await updateProfile(formData);
//     } catch (error) {
//       console.error('Profile update failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Profile Settings
//           </h1>
//           <p className="text-gray-600">
//             Update your personal information and preferences
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           {/* Profile Header */}
//           <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Profile"
//                     className="w-20 h-20 rounded-full object-cover border-4 border-white"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
//                     <User className="w-8 h-8 text-gray-400" />
//                   </div>
//                 )}
//                 <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
//                   <span className={`inline-block w-3 h-3 rounded-full ${
//                     user?.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'
//                   }`} />
//                 </div>
//               </div>
//               <div className="text-white">
//                 <h2 className="text-xl font-bold">{user?.name}</h2>
//                 <p className="text-primary-100 capitalize">{user?.role}</p>
//               </div>
//             </div>
//           </div>

//           {/* Profile Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="p-8">
//             <div className="space-y-6">
//               {/* Profile Image */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Upload className="inline w-4 h-4 mr-1" />
//                   Profile Image
//                 </label>

//                 {imagePreview ? (
//                   <div className="relative mb-4 inline-block">
//                     <img
//                       src={imagePreview}
//                       alt="Profile preview"
//                       className="w-32 h-32 object-cover rounded-full"
//                     />
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
//                     <User className="w-12 h-12 text-gray-400" />
//                   </div>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
//                 />
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <User className="inline w-4 h-4 mr-1" />
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   {...register('name', {
//                     required: 'Name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Name must be at least 2 characters'
//                     }
//                   })}
//                   className="input-field"
//                   placeholder="Enter your full name"
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Mail className="inline w-4 h-4 mr-1" />
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: 'Please enter a valid email address'
//                     }
//                   })}
//                   className="input-field"
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Student-specific fields */}
//               {user?.role === 'student' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <GraduationCap className="inline w-4 h-4 mr-1" />
//                       College
//                     </label>
//                     <input
//                       type="text"
//                       {...register('college', {
//                         required: 'College is required'
//                       })}
//                       className="input-field"
//                       placeholder="Enter your college name"
//                     />
//                     {errors.college && (
//                       <p className="mt-1 text-sm text-red-600">{errors.college.message}</p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Course
//                       </label>
//                       <input
//                         type="text"
//                         {...register('course', {
//                           required: 'Course is required'
//                         })}
//                         className="input-field"
//                         placeholder="e.g., Computer Science"
//                       />
//                       {errors.course && (
//                         <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Year
//                       </label>
//                       <select
//                         {...register('year', {
//                           required: 'Year is required'
//                         })}
//                         className="input-field"
//                       >
//                         <option value="">Select year</option>
//                         <option value="1">1st Year</option>
//                         <option value="2">2nd Year</option>
//                         <option value="3">3rd Year</option>
//                         <option value="4">4th Year</option>
//                       </select>
//                       {errors.year && (
//                         <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="btn-primary flex items-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4" />
//                       <span>Save Changes</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;








import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { User, Mail, GraduationCap, Upload, X, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profileImage || '');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      college: user?.college || '',
      course: user?.course || '',
      year: user?.year || '',
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(user?.profileImage || '');
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Add form fields
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined && value !== '') {
          formData.append(key, value);
        }
      }
      // Add profile image if selected
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      console.log('Submitting profile update...');
      console.log('Selected image:', selectedImage);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }


      await updateProfile(formData);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                  <span className={`inline-block w-3 h-3 rounded-full ${user?.role === 'admin' ? 'bg-purple-500' : 'bg-green-500'
                    }`} />
                </div>
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-primary-100 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-1" />
                  Profile Image
                </label>

                {imagePreview ? (
                  <div className="relative mb-4 inline-block">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="input-field"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Student-specific fields */}
              {user?.role === 'student' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GraduationCap className="inline w-4 h-4 mr-1" />
                      College
                    </label>
                    <input
                      type="text"
                      {...register('college', {
                        required: 'College is required'
                      })}
                      className="input-field"
                      placeholder="Enter your college name"
                    />
                    {errors.college && (
                      <p className="mt-1 text-sm text-red-600">{errors.college.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course
                      </label>
                      <input
                        type="text"
                        {...register('course', {
                          required: 'Course is required'
                        })}
                        className="input-field"
                        placeholder="e.g., Computer Science"
                      />
                      {errors.course && (
                        <p className="mt-1 text-sm text-red-600">{errors.course.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                      </label>
                      <select
                        {...register('year', {
                          required: 'Year is required'
                        })}
                        className="input-field"
                      >
                        <option value="">Select year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      {errors.year && (
                        <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
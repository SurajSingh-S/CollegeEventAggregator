// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const uploadDir = path.join(process.cwd(), 'backend', 'uploads');


// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Create unique filename
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
//   fileFilter: fileFilter
// });

// // Middleware for single file upload
// export const uploadSingle = (fieldName) => {
//   return (req, res, next) => {
//     const singleUpload = upload.single(fieldName);
    
//     singleUpload(req, res, (error) => {
//       if (error) {
//         if (error instanceof multer.MulterError) {
//           if (error.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//               success: false,
//               message: 'File too large. Maximum size is 5MB.'
//             });
//           }
//           return res.status(400).json({
//             success: false,
//             message: `Upload error: ${error.message}`
//           });
//         }
//         return res.status(400).json({
//           success: false,
//           message: error.message
//         });
//       }
//       next();
//     });
//   };
// };

// // Middleware for multiple file upload
// export const uploadMultiple = (fieldName, maxCount = 5) => {
//   return (req, res, next) => {
//     const multipleUpload = upload.array(fieldName, maxCount);
    
//     multipleUpload(req, res, (error) => {
//       if (error) {
//         if (error instanceof multer.MulterError) {
//           if (error.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//               success: false,
//               message: 'File too large. Maximum size is 5MB per file.'
//             });
//           }
//           if (error.code === 'LIMIT_FILE_COUNT') {
//             return res.status(400).json({
//               success: false,
//               message: `Too many files. Maximum ${maxCount} files allowed.`
//             });
//           }
//           return res.status(400).json({
//             success: false,
//             message: `Upload error: ${error.message}`
//           });
//         }
//         return res.status(400).json({
//           success: false,
//           message: error.message
//         });
//       }
//       next();
//     });
//   };
// };

// export default upload;







// backend/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We'll store uploads in: backend/uploads
// (one level up from /middleware)
const uploadDir = path.resolve(__dirname, '..', 'uploads');

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`[upload] created ${uploadDir}`);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // <-- use absolute path (matches Express static)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Restrict to images
const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const baseUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// Single-file helper with sane error responses
export const uploadSingle = (fieldName) => (req, res, next) => {
  const handler = baseUpload.single(fieldName);
  handler(req, res, (err) => {
    if (err) {
      console.error(`[uploadSingle:${fieldName}]`, err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.',
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }
    next();
  });
};

// Multi-file helper (if needed)
export const uploadMultiple = (fieldName, maxCount = 5) => (req, res, next) => {
  const handler = baseUpload.array(fieldName, maxCount);
  handler(req, res, (err) => {
    if (err) {
      console.error(`[uploadMultiple:${fieldName}]`, err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB per file.',
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: `Too many files. Maximum ${maxCount} files allowed.`,
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed',
      });
    }
    next();
  });
};

export default baseUpload;

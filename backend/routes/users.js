// backend/routes/users.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/auth.js'; // Adjust path if needed
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Configure Image Storage (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists in your backend root!
  },
  filename: (req, file, cb) => {
    // Save as: banner-userid-timestamp.jpg
    cb(null, `banner-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  }
});

// --- DEFINE THE ROUTES ---

// POST /api/v1/users/banner
router.post('/banner', verifyToken, upload.single('banner'), userController.uploadBanner);

export default router;
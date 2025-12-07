// backend/controllers/userController.js
import  User  from '../models/User.js'; // Adjust path if needed

export const uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // This path depends on where your 'uploads' folder is served from.
    // Usually it's http://localhost:5000/uploads/filename
    const bannerUrl = `/uploads/${req.file.filename}`;

    // Update the database
    await User.update(
      { banner_url: bannerUrl },
      { where: { id: req.user.id } }
    );

    res.status(200).json({ 
      message: "Banner updated successfully", 
      banner_url: bannerUrl 
    });

  } catch (error) {
    console.error("Banner upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
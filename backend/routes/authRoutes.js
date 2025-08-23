const express = require("express");
const router = express.Router();
const { Protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", Protect, getUserInfo);

// Optional test route
router.get("/", (req, res) => res.send("Auth routes root"));

// Upload image
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;

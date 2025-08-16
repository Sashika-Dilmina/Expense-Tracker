const express = require("express");
const { registerUser,
     loginUser ,
     getUserInfo,
     } = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);

router.post("/login", loginUser);

//router.get("/getUser",Protect, getUserInfo);

module.exports = router; // ✅ export router

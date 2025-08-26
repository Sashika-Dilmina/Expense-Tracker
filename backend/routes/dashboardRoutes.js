const express = require("express");
const { Protect } = require("../middleware/authMiddleware"); // Capital "P" match karanna
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", Protect, getDashboardData);

module.exports = router;

const express = require("express");
const { addIncome, getIncome } = require("../controllers/incomeController");
const { Protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes with Protect middleware
router.post("/", Protect, addIncome);
router.get("/", Protect, getIncome);

module.exports = router;

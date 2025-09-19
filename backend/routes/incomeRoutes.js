const express = require("express");
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} = require("../controllers/incomeController"); 
const { Protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes with Protect middleware
router.post("/add", Protect, addIncome);
router.get("/get", Protect, getAllIncome);
router.delete("/:id", Protect, deleteIncome);
router.get("/downloadexcel", Protect, downloadIncomeExcel); 


module.exports = router;

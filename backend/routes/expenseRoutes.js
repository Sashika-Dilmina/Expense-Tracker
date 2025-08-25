const express = require("express");
const router = express.Router();
const { addExpense, getAllExpenses, deleteExpense, downloadExpenseExcel } = require("../controllers/expenseController");
const { Protect } = require("../middleware/authMiddleware");

// Add Expense
router.post("/add", Protect, addExpense);

// Get All Expenses
router.get("/get", Protect, getAllExpenses);

// Delete Expense
router.delete("/delete/:id", Protect, deleteExpense);

// Download Expenses Excel
router.get("/download", Protect, downloadExpenseExcel);

module.exports = router;

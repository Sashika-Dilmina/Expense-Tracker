const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
  const user = req.user.id; // userId from token

  try {
    const { icon, title, amount, date, source } = req.body;

    // Validation
    if (!title || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new income
    const newIncome = new Income({
      user,
      title,
      amount,
      date: new Date(date),
      icon: icon || "",
      source: source || ""
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      data: newIncome
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: income
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const user = req.user.id; // userId from token
  try { 
    const income = await Income.find({ user }).sort({ date: -1 });


    //prepare data for excel
    const data = income.map((income) => ({
      Source: item.source,
      amount: item.amount,
      Date: item.date,

    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download('income_details.xlsx');
  } catch (error) {
    res.status(500).json({ message : "Server Error" });
  }
};
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) return res.status(400).json({ message: "All fields are required" });

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date)
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Income Sources
exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

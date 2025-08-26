const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch total income & expenses
    const totalIncomeAgg = await Income.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpenseAgg = await Expense.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      user: userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      user: userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Fetch last 5 transactions (income + expense)
    const incomeTxns = (await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(5))
      .map((txn) => ({ ...txn.toObject(), type: "income" }));

    const expenseTxns = (await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(5))
      .map((txn) => ({ ...txn.toObject(), type: "expense" }));

    const lastTransactions = [...incomeTxns, ...expenseTxns].sort(
      (a, b) => b.date - a.date
    );

    // Final Response
    res.json({
      totalBalance:
        (totalIncomeAgg[0]?.total || 0) - (totalExpenseAgg[0]?.total || 0),
      totalExpenses: totalExpenseAgg[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema( {
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String },
    category: {type: String, required: true},  //Example : Food, Rent, Groceries
    amount: {type: Number, required: true},
    date: {type: Date, required: Date.now},
}, {timestamps: true});

module.exports = mongoose.model("Expense", ExpenseSchema);
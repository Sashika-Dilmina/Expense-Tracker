require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

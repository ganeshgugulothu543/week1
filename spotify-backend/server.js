require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Allow only this origin
  }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

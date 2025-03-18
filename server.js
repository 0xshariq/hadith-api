import express from "express";
import dotenv from "dotenv";
import hadithRouter from "./routes/hadith.js";
import userRouter from "./routes/user.js";
import { connectToDatabase } from "./db/database.js";
import { apiKeyMiddleware } from "./middleware/apiKey.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hadith", apiKeyMiddleware, hadithRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Hadith API");
});

// Error handling middleware (must be placed at the end)
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    console.log("🛑 Shutting down gracefully...");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error.message);
    process.exit(1);
  }
});

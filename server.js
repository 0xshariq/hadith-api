import express from "express";
import dotenv from "dotenv";
import hadithRouter from "./routes/hadith.js";
import userRouter from "./routes/user.js"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { apiKeyMiddleware } from "./middleware/apiKey.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Security Middleware
app.use(helmet()); // Adds security headers
app.use(mongoSanitize()); // Prevents MongoDB injection attacks

// Rate Limiting - Prevents abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// Logging Middleware
app.use(morgan("dev"));

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression()); // Improves performance
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/hadith",apiKeyMiddleware, hadithRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Hadith API");
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectToDatabase()

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Failed to start server:", error)
    // Implement appropriate error handling here
    // You might want to retry the connection or exit the process
    process.exit(1)
  }
}

startServer()

// Handle graceful shutdown
process.on("SIGINT", async () => {
  try {
    console.log("Shutting down gracefully...")
    process.exit(0)
  } catch (error) {
    console.error("Error during shutdown:", error)
    process.exit(1)
  }
})


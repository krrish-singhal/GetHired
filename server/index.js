import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import placementsRouter from "./routes/placements.js";
import blogsRouter from "./routes/blogs.js";
import adminRouter from "./routes/admin.js";
import eventsRouter from "./routes/events.js";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

import morgan from "morgan";

dotenv.config();

const app = express();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI,
  allowedOrigins: [
    "https://gethiredapp.vercel.app",
    "http://localhost:5173",
  ]
}

app.use(morgan("dev"));

app.use(helmet());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
  })
)


app.use(express.json());

// Routes
app.use("/api/placements", placementsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/events", eventsRouter);

// Health check
app.get("/api/health", (_, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    status: "ok",
    db:
      dbState === 1
        ? "connected"
        : dbState === 2
          ? "connecting"
          : "disconnected",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
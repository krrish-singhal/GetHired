import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import placementsRouter from "./routes/placements.js";
import blogsRouter from "./routes/blogs.js";
import adminRouter from "./routes/admin.js";
import eventsRouter from "./routes/events.js";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(helmet());
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

// Always start HTTP server first
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    console.log(
      "Server running without DB — whitelist your IP in MongoDB Atlas to enable DB features",
    );
  });

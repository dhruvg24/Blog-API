import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
// helmet helps from security vulnerabilities like XSS, clickjacking, etc.

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected succesfully");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

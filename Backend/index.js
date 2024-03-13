import "dotenv/config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT } from "./src/configs/index.js";
import { pool } from "./src/db/index.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001", "https://learn-jman.vercel.app"],
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
import userRoutes from "./src/routes/userRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

// Connect to the database

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database", error));

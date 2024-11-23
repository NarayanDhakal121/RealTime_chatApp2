import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import { connectdb } from "./src/lib/db.js";
dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

// for routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT :" + PORT);
  connectdb();
});

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); // use this in entry file. it loads environment variables into process.env, where process.env is global

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});

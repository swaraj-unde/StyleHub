import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import mongoose from "mongoose";
import cookieParse from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth.routes.js";
import adminProductRouter from "./routes/admin/product.routes.js";
import shopProductRouter from "./routes/shop/product.routes.js";
import shopCartRouter from "./routes/shop/cart.routes.js";
import shopAddressRouter from "./routes/shop/address.routes.js";
import shopOrderRouter from "./routes/shop/order.routes.js";
import adminOrderRouter from "./routes/admin/order.routes.js";
import shopSearchRouter from "./routes/shop/search.routes.js";
import shopReviewRouter from "./routes/shop/review.routes.js";
import commonFeatureRouter from "./routes/common/feature.routes.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(cookieParse());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/order", adminOrderRouter);

app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

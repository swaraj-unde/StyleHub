import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "Any",
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    averageReview: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", ProductSchema);

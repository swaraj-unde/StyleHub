import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { Review } from "../../models/review.model.js";

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    if (
      !productId ||
      !userId ||
      !userName ||
      !reviewMessage ||
      reviewValue === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (reviewValue < 1 || reviewValue > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const order = await Order.findOne({
      userId,
      orderStatus: "delivered",
      "cartItems.productId": productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You can review only delivered products that you purchased.",
      });
    }

    const existingReview = await Review.findOne({
      productId,
      userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    const newReview = await Review.create({
      productId,
      userId,
      userName,
      reviewMessage: reviewMessage.trim(),
      reviewValue,
    });

    const ratingStats = await Review.aggregate([
      {
        $match: {
          productId: product._id,
        },
      },
      {
        $group: {
          _id: null,
          averageReview: { $avg: "$reviewValue" },
        },
      },
    ]);

    const averageReview =
      ratingStats.length > 0
        ? Number(ratingStats[0].averageReview.toFixed(1))
        : 0;

    await Product.findByIdAndUpdate(productId, {
      averageReview,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProductReview, getProductReviews };

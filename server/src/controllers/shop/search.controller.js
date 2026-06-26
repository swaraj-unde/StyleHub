import { Product } from "../../models/product.model.js";

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regEx = new RegExp(escapedKeyword, "i");

    const products = await Product.find({
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

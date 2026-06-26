import { Product } from "../../models/product.model.js";

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== string) {
      return res.status(400).json({
        success: false,
        message: "Keyword Required in String Format",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        {
          title: regEx,
        },
        {
          description: regEx,
        },
        {
          category: regEx,
        },
        {
          brand: regEx,
        },
      ],
    };

    const products = await Product.find(createSearchQuery);

    return res.status(200).json({
      success: true,
      message: "Products Fetched",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

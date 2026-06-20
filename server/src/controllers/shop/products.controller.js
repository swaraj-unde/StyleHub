import { Product } from "../../models/product.model.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filter = {};
    if (category.length) {
      filter.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filter.brand = { $in: brand.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    const products = await Product.find(filter).sort(sort);

    return res.status(200).json({
      success: true,
      message: "Fetched The Products",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While fetching The Products",
      error: error.message,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Found",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While getting The Products",
      error: error.message,
    });
  }
};

export { getFilteredProducts,getProductDetails };

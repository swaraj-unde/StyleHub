import { Product } from "../../models/product.model.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filter = {};
    if (category.length) {
      filter.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filter.category = { $in: brand.split(",") };
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

export { getFilteredProducts };

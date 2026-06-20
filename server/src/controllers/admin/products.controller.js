import { Product } from "../../models/product.model.js";
import { imageUploadUtil } from "../../utils/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    return res.status(200).json({
      success: true,
      message: "Image Upload Successful",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error While Uploading The Image",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const product = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product added Successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While Adding The Product",
      error: error.message,
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "Products fetched Successfully",
      data: listOfProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While fetching The Products",
      error: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Doesn't Exist",
      });
    }

    product.image = image || product.image;
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price ?? product.price;
    product.salePrice = salePrice ?? product.salePrice;
    product.totalStock = totalStock ?? product.totalStock;

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While Editing The Product",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Doesn't Exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While Deleting The Product",
      error: error.message,
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
};

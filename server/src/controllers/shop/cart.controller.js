import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const currInd = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (currInd === -1) {
      cart.items.push({
        productId,
        quantity,
      });
    } else {
      cart.items[currInd].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Added to Cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Adding Product to Cart",
      error: error.message,
    });
  }
};
const fetchCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    const cartObj = cart.toObject();

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: {
        ...cartObj,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    const cartObj = cart.toObject();

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: {
        ...cartObj,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating product in cart",
      error: error.message,
    });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const validItems = cart.items.filter((item) => item.productId);

    const populatedCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    const cartObj = cart.toObject();

    return res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: {
        ...cartObj,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting product from cart",
      error: error.message,
    });
  }
};
export { addToCart, deleteCartItem, updateCartItemQuantity, fetchCart };

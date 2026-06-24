import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { paypal } from "../../utils/paypal.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      paymentMethod,
      cartId,
    } = req.body;

    const createPaymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/shop/paypal-return`,
        cancel_url: `${process.env.FRONTEND_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: Number(item.price).toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: Number(totalAmount).toFixed(2),
          },
          description: "Order Payment",
        },
      ],
    };

    paypal.payment.create(createPaymentJson, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal Error:", error);

        return res.status(500).json({
          success: false,
          message: error.response?.message || error.message,
        });
      }

      try {
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,

          totalAmount,
          paymentMethod,

          orderStatus: "pending",
          paymentStatus: "pending",

          paymentId: "",
          payerId: "",

          orderDate: new Date(),
          orderUpdateDate: new Date(),
        });

        await newOrder.save();

        const approvalLink = paymentInfo.links.find(
          (link) => link.rel === "approval_url",
        );

        if (!approvalLink) {
          return res.status(500).json({
            success: false,
            message: "Approval URL not found from PayPal",
          });
        }

        return res.status(200).json({
          success: true,
          approvalURL: approvalLink.href,
          orderId: newOrder._id,
        });
      } catch (dbError) {
        console.error("Order Save Error:", dbError);

        return res.status(500).json({
          success: false,
          message: dbError.message,
        });
      }
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} has only ${product.totalStock} item(s) left in stock`,
        });
      }
    }

    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);

      product.totalStock -= item.quantity;

      await product.save();
    }

    order.paymentStatus = "paid";
    order.orderStatus = "inProcess";
    order.paymentId = paymentId;
    order.payerId = payerId;
    order.orderUpdateDate = new Date();

    await order.save();

    await Cart.findByIdAndUpdate(order.cartId, {
      items: [],
    });

    return res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { capturePayment, getAllOrders, getOrderDetails };

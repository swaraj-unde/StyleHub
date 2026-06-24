import { Order } from "../../models/order.model.js";
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
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createOrder, capturePayment };

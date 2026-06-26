import img from "@/assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { UserCartItems } from "@/components/shopping-view/cart-items-cnt";
import { createNewOrder } from "@/store/shop/order-slice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ShopCheckout() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, approvalURL } = useSelector((state) => state.shopOrder);

  const [currSelAddress, setCurrSelAddress] = useState({});

  const totalAmount =
    cartItems?.items?.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0,
    ) || 0;

  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  function handlePaypalPayment() {
    if (!currSelAddress || Object.keys(currSelAddress).length === 0) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!cartItems?.items?.length) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      userId: user.id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currSelAddress._id,
        address: currSelAddress.address,
        city: currSelAddress.city,
        pincode: currSelAddress.pincode,
        phone: currSelAddress.phone,
        notes: currSelAddress.notes,
      },
      totalAmount,
      paymentMethod: "paypal",
      cartId: cartItems._id,
    };

    dispatch(createNewOrder(orderData));
  }

  return (
    <>
     
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-violet-500" />

            <h2 className="mt-5 text-2xl font-bold text-white">
              Creating Your Order
            </h2>

            <p className="mt-3 text-zinc-400">
              Please wait while we securely connect to PayPal.
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-full animate-pulse rounded-full bg-violet-500"></div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-black text-white">

        <div className="relative w-full overflow-hidden border-b border-zinc-800">
          <img
            src={img}
            alt="Checkout Banner"
            className="h-[220px] w-full object-cover brightness-40 md:h-[320px]"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Checkout
              </h1>

              <p className="mt-2 text-sm text-zinc-300 md:text-lg">
                Review your order and complete your purchase
              </p>
            </div>
          </div>
        </div>


        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

            <div className="xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-3xl font-bold">Delivery Address</h2>

                <p className="mt-1 text-zinc-400">
                  Select or add a delivery address
                </p>
              </div>

              <Address
                currSelAddress={currSelAddress}
                setCurrSelAddress={setCurrSelAddress}
              />
            </div>


            <div className="xl:col-span-1">
              <div className="sticky top-6 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
                <div className="border-b border-zinc-800 p-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                </div>

                <div className="max-h-[500px] space-y-4 overflow-y-auto p-6">
                  {cartItems?.items?.length ? (
                    cartItems.items.map((item) => (
                      <div
                        key={item.productId}
                        className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
                      >
                        <UserCartItems cartItem={item} />
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-zinc-700 p-8 text-center">
                      <p className="text-zinc-500">Your cart is empty.</p>
                    </div>
                  )}
                </div>

                {cartItems?.items?.length > 0 && (
                  <div className="border-t border-zinc-800 p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-zinc-400">
                        <span>Items</span>
                        <span>{cartItems.items.length}</span>
                      </div>

                      <div className="flex justify-between text-zinc-400">
                        <span>Subtotal</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-zinc-400">
                        <span>Shipping</span>
                        <span className="text-green-500">Free</span>
                      </div>

                      <div className="flex justify-between border-t border-zinc-800 pt-3 text-xl font-bold">
                        <span>Total</span>

                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePaypalPayment}
                      disabled={isLoading}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-300"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Creating Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

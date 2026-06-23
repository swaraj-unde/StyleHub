import img from "@/assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { UserCartItems } from "@/components/shopping-view/cart-items-cnt";
import { useSelector } from "react-redux";

export default function ShopCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const totalAmount =
    cartItems?.items?.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0,
    ) || 0;
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full overflow-hidden border-b border-zinc-800">
        <img
          src={img}
          alt="Checkout Banner"
          className="w-full h-[220px] md:h-[320px] object-cover brightness-40"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Checkout
            </h1>
            <p className="mt-2 text-zinc-300 text-sm md:text-lg">
              Review your order and complete your purchase
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white">
                Delivery Address
              </h2>
              <p className="text-zinc-400 mt-1">
                Select or add a delivery address
              </p>
            </div>

            <Address />
          </div>


          <div className="xl:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
              <div className="border-b border-zinc-800 p-6">
                <h2 className="text-2xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="max-h-[500px] overflow-y-auto p-6 space-y-4">
                {cartItems?.items?.length > 0 ? (
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

                    <div className="border-t border-zinc-800 pt-3 flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 rounded-lg bg-white text-black py-3 font-semibold transition hover:bg-zinc-200">
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

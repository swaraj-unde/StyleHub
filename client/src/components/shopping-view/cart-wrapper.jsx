import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { UserCartItems } from "./cart-items-cnt";

export function UserCartWrapper({ cartItems }) {
  const totalAmount =
    cartItems?.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0,
    ) || 0;

  return (
    <SheetContent className="flex h-full flex-col border-l border-zinc-800 bg-zinc-950 text-white sm:max-w-lg">
      <SheetHeader>
        <SheetTitle className="text-xl text-white">Your Cart</SheetTitle>
      </SheetHeader>


      <div className="mt-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600">
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItems key={item.productId} cartItem={item} />
            ))
          ) : (
            <div className="mt-10 text-center text-zinc-500">
              Your cart is empty
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-800 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-medium text-zinc-300">Total</span>

          <span className="text-xl font-bold text-white">₹{totalAmount}</span>
        </div>

        <Button className="h-11 w-full bg-white text-black hover:bg-zinc-200">
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

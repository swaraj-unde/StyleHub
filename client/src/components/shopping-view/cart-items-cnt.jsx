import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

export function UserCartItems({ cartItem }) {
  const itemPrice =
    cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price;

  const { user } = useSelector((state) => state.auth);

  const itemTotal = itemPrice * cartItem.quantity;
  const dispatch = useDispatch();
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem.productId }),
    ).then((data) => {
      if (data?.payload.success) {
        toast.success(data.payload.message);
      }
    });
  }

  function handleUpdateQuantity(getCartItem, type) {
    const newQuantity =
      type === "minus" ? getCartItem.quantity - 1 : getCartItem.quantity + 1;
    if (newQuantity < 1) return;
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem.productId,
        quantity: newQuantity,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
      } else {
        toast.error("Out Of Stock");
      }
    });
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="h-20 w-20 rounded-md object-cover"
      />

      <div className="flex flex-1 flex-col">
        <h3 className="text-sm font-semibold text-white">{cartItem.title}</h3>

        <span className="mt-1 text-sm text-zinc-400">
          Quantity: {cartItem.quantity}
        </span>

        <span className="mt-2 text-lg font-bold text-white">₹{itemTotal}</span>

        <span className="text-xs text-zinc-500">
          ₹{itemPrice} × {cartItem.quantity}
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          disabled={cartItem.quantity <= 1}
          onClick={() => handleUpdateQuantity(cartItem, "minus")}
          size="icon"
          variant="outline"
          className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-sm font-medium text-white">
          {cartItem.quantity}
        </span>

        <Button
          onClick={() => handleUpdateQuantity(cartItem, "plus")}
          size="icon"
          variant="outline"
          className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button
        onClick={() => handleCartItemDelete(cartItem)}
        size="icon"
        variant="ghost"
        className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}

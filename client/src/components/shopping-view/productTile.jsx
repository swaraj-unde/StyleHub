import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Button } from "../ui/button";

export default function ShoppingProductTile({
  product,
  handelGetProduct,
  handleAddToCart,
}) {
  const discounted =
    product?.salePrice > 0 && product?.salePrice < product?.price;

  const discountPercentage = discounted
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const stock = product?.totalStock || 0;

  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30">
      <div onClick={() => handelGetProduct(product._id)}>
        <div className="relative h-52 overflow-hidden bg-black">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {discounted && (
            <span className="absolute left-2 top-2 rounded-md bg-green-500 px-2 py-1 text-xs font-semibold text-white">
              {discountPercentage}% OFF
            </span>
          )}

          <span
            className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium ${
              stock > 20
                ? "bg-green-500/20 text-green-400"
                : stock > 5
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-red-500/20 text-red-400"
            }`}
          >
            {stock > 20
              ? `${stock} in stock`
              : stock > 5
                ? `Only ${stock} left`
                : stock > 0
                  ? `Hurry! ${stock} left`
                  : "Out of Stock"}
          </span>
        </div>

        <div className="p-4">
          <h3 className="truncate text-base font-semibold text-white">
            {product?.title}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
              {categoryOptionsMap[product?.category]}
            </span>

            <span className="text-xs text-zinc-500">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              ₹{discounted ? product?.salePrice : product?.price}
            </span>

            {discounted && (
              <>
                <span className="text-sm text-zinc-500 line-through">
                  ₹{product?.price}
                </span>

                <span className="text-xs font-medium text-green-400">
                  Save ₹{product?.price - product?.salePrice}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 p-3">
        <Button
          onClick={() => handleAddToCart(product?._id)}
          disabled={stock === 0}
          className="w-full bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400"
        >
          {stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </Button>
      </div>
    </div>
  );
}

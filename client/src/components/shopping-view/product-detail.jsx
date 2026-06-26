import { useDispatch } from "react-redux";
import { Dialog, DialogContent } from "../ui/dialog";
import { setProductDetails } from "@/store/shop/product-slice";

export function ProductDetailBox({ open, setOpen, product, handleAddToCart }) {
  if (!product) return null;

  const isOnSale =
    product?.salePrice > 0 && product?.salePrice < product?.price;

  const discount = isOnSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const stock = product?.totalStock || 0;

  const dispatch = useDispatch();

  function handleDialogClose(isOpen) {
    setOpen(isOpen);

    if (!isOpen) {
      dispatch(setProductDetails(null));
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="
          p-0 overflow-hidden bg-zinc-950 text-white border border-zinc-800

          w-[95vw]
          max-w-2xl

          md:max-w-4xl
          lg:max-w-5xl
        "
      >
        <div className="flex flex-col md:flex-row">
          <div
            className="
            relative bg-black
            w-full md:w-1/2
            h-72 md:h-[420px] lg:h-[450px]
          "
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />

            {isOnSale && (
              <span className="absolute left-3 top-3 rounded bg-green-500 px-2 py-1 text-xs font-semibold">
                {discount}% OFF
              </span>
            )}

            <span
              className={`absolute right-3 top-3 rounded px-2 py-1 text-xs font-medium ${
                stock > 20
                  ? "bg-green-500/20 text-green-400"
                  : stock > 5
                    ? "bg-orange-500/20 text-orange-400"
                    : stock > 0
                      ? "bg-red-500/20 text-red-400"
                      : "bg-zinc-700 text-zinc-300"
              }`}
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="p-5 space-y-4 w-full md:w-1/2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{product.title}</h2>
              <p className="text-sm text-zinc-400 mt-1">
                {product.category} • {product.brand}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                ₹{isOnSale ? product.salePrice : product.price}
              </span>

              {isOnSale && (
                <>
                  <span className="text-sm text-zinc-500 line-through">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-green-400">
                    Save ₹{product.price - product.salePrice}
                  </span>
                </>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-300">
                Description
              </h3>
              <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded bg-zinc-900 p-3">
                <p className="text-zinc-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>

              <div className="rounded bg-zinc-900 p-3">
                <p className="text-zinc-500">Brand</p>
                <p className="font-medium">{product.brand}</p>
              </div>

              <div className="rounded bg-zinc-900 p-3">
                <p className="text-zinc-500">Stock</p>
                <p className="font-medium">{stock}</p>
              </div>

              <div className="rounded bg-zinc-900 p-3">
                <p className="text-zinc-500">Status</p>
                <p
                  className={`font-medium ${stock > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {stock > 0 ? "Available" : "Out of Stock"}
                </p>
              </div>
            </div>

            <button
              disabled={stock === 0}
              onClick={() => handleAddToCart(product._id)}
              className="w-full rounded bg-white py-2 font-medium text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

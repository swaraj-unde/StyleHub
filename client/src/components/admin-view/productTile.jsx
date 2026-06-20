import { Button } from "../ui/button";

export default function AdminProductTile({ product }) {
  const discounted =
    product?.salePrice > 0 && product?.salePrice < product?.price;

  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-black">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute top-2 right-2 rounded px-2 py-1 text-[10px] font-medium ${
            product?.totalStock > 10
              ? "bg-green-500/20 text-green-400"
              : product?.totalStock > 0
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {product?.totalStock}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="truncate text-sm font-medium text-white">
          {product?.title}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-zinc-400">{product?.category}</span>

          <span className="text-xs text-zinc-500">{product?.brand}</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-white">
            ₹{product?.salePrice || product?.price}
          </span>

          {product?.salePrice > 0 && product?.salePrice<product?.price && (
            <span className="text-xs text-zinc-500 line-through">
              ₹{product?.price}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-2 border-t border-zinc-800 p-2">
        <Button
          size="sm"
          variant="ghost"
          className="bg-zinc-800 text-white hover:bg-zinc-700"
        >
          Edit
        </Button>

        <Button size="sm" className="bg-red-600 hover:bg-red-700">
          Delete
        </Button>
      </div>
    </div>
  );
}

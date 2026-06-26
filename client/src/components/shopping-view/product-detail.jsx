import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "../ui/dialog";
import { setProductDetails } from "@/store/shop/product-slice";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";

export function ProductDetailBox({ open, setOpen, product, handleAddToCart }) {
  if (!product) return null;

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const isOnSale =
    product?.salePrice > 0 && product?.salePrice < product?.price;

  const discount = isOnSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const stock = product?.totalStock || 0;

  const dispatch = useDispatch();

  const calculatedAverageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  function handleDialogClose(isOpen) {
    setOpen(isOpen);

    if (!isOpen) {
      dispatch(setProductDetails(null));
      setRating(0);
      setReviewMsg("");
    }
  }

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: product?._id,
        userId: user?.id,
        userName: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(product?._id));
        toast.success(data.payload.message);
      }
    });
  }

  useEffect(() => {
    if (product !== null) dispatch(getReviews(product?._id));
  }, [product, dispatch]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="
          p-0 overflow-y-auto md:overflow-hidden bg-zinc-950 text-white border border-zinc-800
          w-[95vw]
          max-w-2xl
          md:max-w-4xl
          lg:max-w-5xl
          max-h-[90vh] md:max-h-none
        "
      >
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row border-b border-zinc-800">
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

            <div className="p-5 space-y-4 w-full md:w-1/2 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-1.5">
                    <p className="text-sm text-zinc-400">
                      {product.category} • {product.brand}
                    </p>
                    {calculatedAverageRating > 0 && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-xs font-semibold text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {calculatedAverageRating}
                        </div>
                      </>
                    )}
                  </div>
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
              </div>

              <button
                disabled={stock === 0}
                onClick={() => handleAddToCart(product._id)}
                className="w-full mt-4 rounded bg-white py-2 font-medium text-black hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          <div className="p-5 bg-zinc-950/40 space-y-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-bold tracking-tight">
                Reviews ({reviews?.length || 0})
              </h2>
              {calculatedAverageRating > 0 && (
                <span className="text-xs font-medium text-zinc-400">
                  (Avg. Rating: {calculatedAverageRating} / 5)
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2 border-r-0 md:border-r border-zinc-800/60">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem, index) => (
                    <div
                      key={reviewItem?._id || index}
                      className="flex gap-3 items-start pb-3 border-b border-zinc-900 last:border-0"
                    >
                      <Avatar className="w-8 h-8 border border-zinc-800 bg-zinc-900">
                        <AvatarFallback className="text-xs bg-zinc-800 text-zinc-200">
                          {reviewItem?.userName
                            ? reviewItem.userName[0].toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-zinc-200">
                            {reviewItem?.userName}
                          </h3>
                          <StarRatingComponent
                            rating={reviewItem?.reviewValue}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-normal">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center">
                    <h1 className="text-sm text-zinc-500">
                      No Reviews yet. Be the first!
                    </h1>
                  </div>
                )}
              </div>

              {/* Right Column: Submission Form */}
              <div className="flex flex-col gap-3">
                <Label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Write a review
                </Label>

                <div className="flex gap-1 bg-zinc-900 p-2 rounded w-fit border border-zinc-800">
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>

                <div className="flex gap-2">
                  <Input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(event) => setReviewMsg(event.target.value)}
                    placeholder="Write a review..."
                    className="bg-zinc-900 border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700 flex-1"
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === "" || rating === 0}
                    className="bg-white text-black hover:bg-zinc-200 font-medium px-4"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

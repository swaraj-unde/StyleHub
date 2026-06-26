import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

import { ProductDetailBox } from "@/components/shopping-view/product-detail";
import ShoppingProductTile from "@/components/shopping-view/productTile";
import { Input } from "@/components/ui/input";

import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";

export default function SearchPage() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);

  const { productDetails } = useSelector((state) => state.shopProduct);

  useEffect(() => {
    if (productDetails?._id) {
      setOpen(true);
    }
  }, [productDetails]);

  useEffect(() => {
    const value = keyword.trim();

    const timer = setTimeout(() => {
      if (value) {
        if (searchParams.get("keyword") !== value) {
          setSearchParams({ keyword: value });
        }

        dispatch(getSearchResults(value));
      } else {
        setSearchParams({});
        dispatch(resetSearchResults());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, dispatch, setSearchParams]);

  function handleGetProduct(id) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddToCart(productId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast.success(data.payload.message);
      } else {
        toast.error("Out Of Stock");
      }
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Search Products</h1>

          <p className="mt-2 text-zinc-400">
            Search by product name, category, brand or description.
          </p>
        </div>

        <div className="sticky top-0 z-30 mb-8 border-b border-zinc-800 bg-zinc-950/90 py-5 backdrop-blur">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
                keyword ? "text-violet-500" : "text-zinc-500"
              }`}
            />

            <Input
              value={keyword}
              placeholder="Search products..."
              onChange={(e) => setKeyword(e.target.value)}
              className="h-12 rounded-full border border-zinc-700 bg-zinc-900 pl-12 pr-5 text-white placeholder:text-zinc-500 focus:border-violet-500"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex h-[50vh] flex-col items-center justify-center gap-5">
            <Loader2 className="h-10 w-10 animate-spin text-violet-500" />

            <h2 className="text-lg font-semibold">Finding Products...</h2>

            <p className="text-zinc-500">Please wait a moment.</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search Results</h2>

              <span className="rounded-full bg-violet-500/20 px-4 py-1 text-sm font-medium text-violet-400">
                {searchResults.length} Product
                {searchResults.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((item) => (
                <ShoppingProductTile
                  key={item._id}
                  product={item}
                  handelGetProduct={handleGetProduct}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}

        {!isLoading && keyword.trim() && searchResults.length === 0 && (
          <div className="flex h-[50vh] flex-col items-center justify-center">
            <Search className="mb-5 h-20 w-20 text-zinc-700" />

            <h2 className="text-2xl font-semibold">No Products Found</h2>

            <p className="mt-3 max-w-md text-center text-zinc-500">
              No products matched{" "}
              <span className="font-semibold text-white">"{keyword}"</span>. Try
              another search.
            </p>
          </div>
        )}

        {!isLoading && !keyword.trim() && searchResults.length === 0 && (
          <div className="flex h-[50vh] flex-col items-center justify-center">
            <Search className="mb-5 h-20 w-20 text-zinc-700" />

            <h2 className="text-2xl font-semibold">Search Products</h2>

            <p className="mt-3 text-center text-zinc-500">
              Start typing to discover products from our collection.
            </p>
          </div>
        )}
      </div>

      <ProductDetailBox
        open={open}
        setOpen={setOpen}
        product={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

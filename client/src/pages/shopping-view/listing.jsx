import ProductFilter from "@/components/shopping-view/filter";
import { ProductDetailBox } from "@/components/shopping-view/product-detail";
import ShoppingProductTile from "@/components/shopping-view/productTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function ShopListing() {
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }),
      );
    }
  }, [dispatch, sort, filters]);

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const creatQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(creatQueryString));
    }
  }, [filters]);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sectionId, option) {
    const copyFilters = { ...filters };

    if (!copyFilters[sectionId]) {
      copyFilters[sectionId] = [option];
    } else {
      const index = copyFilters[sectionId].indexOf(option);

      if (index === -1) {
        copyFilters[sectionId].push(option);
      } else {
        copyFilters[sectionId].splice(index, 1);

        if (copyFilters[sectionId].length === 0) {
          delete copyFilters[sectionId];
        }
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }
  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  function handelGetProduct(getId) {
    dispatch(fetchProductDetails(getId));
  }

  function handleAddToCart(currProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: currProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast.success(data.payload.message);
      } else {
        toast.error("Failed to add product");
      }
    });
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:hidden">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
          </div>

          <aside className="hidden lg:block">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
          </aside>

          <main className="space-y-4">
            <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">
                  All Products
                </h1>
                <p className="text-sm text-zinc-400">
                  {productList.length} products found
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort By
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 border-zinc-800 bg-zinc-900 text-white"
                >
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((item) => (
                      <DropdownMenuRadioItem
                        key={item.id}
                        value={item.id}
                        className="cursor-pointer pl-8 focus:bg-zinc-800"
                      >
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {productList?.length > 0 ? (
                productList.map((item) => (
                  <ShoppingProductTile
                    key={item._id}
                    product={item}
                    handelGetProduct={handelGetProduct}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <div className="col-span-full flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900">
                  <p className="text-zinc-500">No products found</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <ProductDetailBox
        handleAddToCart={handleAddToCart}
        open={open}
        setOpen={setOpen}
        product={productDetails}
      />
    </div>
  );
}

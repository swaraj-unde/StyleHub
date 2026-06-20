import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShopListing() {
  const [sort, setSort] = useState();

  const { productList } = useSelector((state) => state.shopProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="lg:hidden">
            <ProductFilter />
          </div>

          <aside className="hidden lg:block">
            <ProductFilter />
          </aside>

          <main className="space-y-4">
            <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-white">
                  All Products
                </h1>
                <p className="text-sm text-zinc-400">0 products found</p>
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
                  <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
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
              <div className="col-span-full flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900">
                <p className="text-zinc-500">Products will appear here</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

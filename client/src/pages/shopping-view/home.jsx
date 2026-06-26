import { Button } from "@/components/ui/button";
import {
  Shirt,
  Trophy,
  Medal,
  Flame,
  Gem,
  Sparkles,
  Crown,
  PersonStanding,
  Baby,
  Watch,
  Footprints,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "@/components/shopping-view/productTile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { ProductDetailBox } from "@/components/shopping-view/product-detail";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { toast } from "sonner";
import { getFeatureImages } from "@/store/common";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: PersonStanding },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Watch },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Trophy },
  { id: "adidas", label: "Adidas", icon: Medal },
  { id: "puma", label: "Puma", icon: Flame },
  { id: "levi", label: "Levi's", icon: Gem },
  { id: "zara", label: "Zara", icon: Sparkles },
  { id: "h&m", label: "H&M", icon: Crown },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { featureImageList = [] } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct,
  );

  const randomProducts = useMemo(() => {
    return [...(productList || [])].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [productList]);

  function handleNavigateToListingPage(item, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [item.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handelGetProduct(productId) {
    dispatch(fetchProductDetails(productId));
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
        toast.success("Product added to cart");
      }
    });
  }

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    if (featureImageList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-zinc-800">
      <div className="relative h-[300px] sm:h-[450px] md:h-[600px] w-full overflow-hidden border-b border-zinc-800 bg-zinc-900/20">
        {featureImageList.length > 0 ? (
          featureImageList.map((slide, index) => (
            <img
              onClick={() => navigate("/shop/listing")}
              key={slide._id || index}
              src={slide.image || slide}
              alt={`banner-${index}`}
              className={`absolute left-0 top-0 h-full w-full object-cover cursor-pointer transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
            No live banners active
          </div>
        )}

        {featureImageList.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + featureImageList.length) %
                    featureImageList.length,
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 border-zinc-800 bg-zinc-950/70 text-white backdrop-blur-sm hover:bg-zinc-900 transition-colors rounded-full"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 border-zinc-800 bg-zinc-950/70 text-white backdrop-blur-sm hover:bg-zinc-900 transition-colors rounded-full"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {featureImageList.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <section className="border-b border-zinc-800/80 py-16 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Shop by Category
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-1.5">
              Explore premium essentials curated explicitly around your unique
              daily routine.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <Card
                key={category.id}
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                className="cursor-pointer border-zinc-900 bg-zinc-900/40 text-white transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700/60 hover:bg-zinc-900 hover:shadow-lg shadow-black/40"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="mb-3 h-10 w-10 text-zinc-400 transition-colors group-hover:text-white" />
                  <span className="text-sm font-semibold tracking-wide">
                    {category.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800/80 py-16 bg-zinc-900/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Shop by Brand
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-1.5">
              Elevate your closet with authorized inventory drops from top
              premium global labels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brand) => (
              <Card
                key={brand.id}
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                className="cursor-pointer border-zinc-900 bg-zinc-900/40 text-white transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700/60 hover:bg-zinc-900 hover:shadow-lg shadow-black/40"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="mb-3 h-10 w-10 text-zinc-400" />
                  <span className="text-sm font-semibold tracking-wide">
                    {brand.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Featured Products
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm mt-1.5">
              Fresh items matching premium trends, available on instant
              dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handelGetProduct={handelGetProduct}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailBox
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        product={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default ShoppingHome;

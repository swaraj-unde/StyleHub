import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

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

const featureImageList = [bannerOne, bannerTwo, bannerThree];

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

    const currentFilter = {
      [section]: [item.id],
    };

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
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="relative h-[600px] w-full overflow-hidden border-b border-zinc-800">
        {featureImageList.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`banner-${index}`}
            className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev - 1 + featureImageList.length) % featureImageList.length,
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 border-zinc-700 bg-zinc-900/80 text-white hover:bg-zinc-800"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 border-zinc-700 bg-zinc-900/80 text-white hover:bg-zinc-800"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <section className="border-b border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categoriesWithIcon.map((category) => (
              <Card
                key={category.id}
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                className="cursor-pointer border-zinc-800 bg-zinc-900 text-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-800"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="mb-4 h-12 w-12 text-zinc-300" />
                  <span className="font-semibold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Shop by Brand</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcon.map((brand) => (
              <Card
                key={brand.id}
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                className="cursor-pointer border-zinc-800 bg-zinc-900 text-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-800"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brand.icon className="mb-4 h-12 w-12 text-zinc-300" />
                  <span className="font-semibold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

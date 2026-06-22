import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";
import { UserCartWrapper } from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
  const navigate = useNavigate();

  function handleNavigateToPage(menuItem) {

    if (menuItem.id === "home" || menuItem.id === "products") {
      sessionStorage.removeItem("filters");
    } else {
      sessionStorage.setItem(
        "filters",
        JSON.stringify({
          category: [menuItem.id],
        }),
      );
    }
    window.dispatchEvent(new Event("filtersChanged"));

    navigate(menuItem.path);
  }

  return (
    <nav className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      {shoppingViewHeaderMenuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavigateToPage(item)}
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openCart, setOpenCart] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchCartItems({ userId: user?.id }));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-3">
      {/* Cart */}
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button
          onClick={() => setOpenCart(true)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        ></UserCartWrapper>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer border border-zinc-700">
            <AvatarFallback className="bg-zinc-800 text-white">
              {user?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 border-zinc-800 bg-zinc-950 text-white"
        >
          <DropdownMenuLabel className="text-zinc-300">
            Logged in as {user?.username}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-zinc-800" />

          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer focus:bg-zinc-800"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-400 focus:bg-red-900/30"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ShopHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/shop/home" className="flex items-center gap-3 text-white">
          <div className="rounded-lg bg-zinc-800 p-2">
            <HousePlug className="h-5 w-5" />
          </div>

          <span className="text-lg font-bold tracking-tight">Ecommerce</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <MenuItems />

          {isAuthenticated ? (
            <HeaderRightContent />
          ) : (
            <Button
              onClick={() => navigate("/auth/login")}
              className="bg-white text-black hover:bg-zinc-200"
            >
              Login
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-2 w-72 border-r border-zinc-800 bg-zinc-950 text-white"
          >
            <div className="mt-8 flex flex-col gap-8">
              <MenuItems />

              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

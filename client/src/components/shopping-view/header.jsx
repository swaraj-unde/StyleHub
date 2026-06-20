import { HousePlug, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

export default function ShopHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        <Link to="/shop/home">
          <HousePlug></HousePlug>
          <span>Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left"></SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          {isAuthenticated ? <div>
            
          </div> : null}
        </div>
      </div>
    </div>
  );
}

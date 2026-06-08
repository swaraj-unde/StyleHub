import { Outlet } from "react-router-dom";
import ShopHeader from "./header";
function ShopLayout() {
  return (
    <div>
      <div>
        <ShopHeader />
        {/* Shop header */}
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
export default ShopLayout;

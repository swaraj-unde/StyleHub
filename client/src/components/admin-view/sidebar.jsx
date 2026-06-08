import { FileChartColumn } from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CalendarArrowDown,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSideBar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket className="h-5 w-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <CalendarArrowDown className="h-5 w-5" />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);
    if (setOpen) setOpen(false);
  };

  return (
    <nav className="mt-6 space-y-2">
      {adminSideBar.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all
              ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="bg-zinc-950 text-white border-r border-zinc-800 w-72"
        >
          <SheetHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <FileChartColumn className="h-6 w-6" />
              <SheetTitle className="text-white text-lg">
                Admin Panel
              </SheetTitle>
            </div>
          </SheetHeader>

          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="h-screen w-64 bg-zinc-950 border-r border-zinc-800 text-white p-4 hidden lg:block">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 cursor-pointer px-2 py-3 rounded-lg hover:bg-zinc-900 transition"
        >
          <FileChartColumn className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
}

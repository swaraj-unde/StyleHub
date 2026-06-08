import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {

  const [openSidebar ,setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

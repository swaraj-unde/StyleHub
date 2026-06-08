import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-zinc-950 border-r border-zinc-800 px-12">
          <h1 className="text-5xl font-bold tracking-tight">Ecommerce</h1>

          <p className="mt-4 max-w-md text-center text-zinc-400">
            Build, manage and scale your online store with a seamless shopping
            experience.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

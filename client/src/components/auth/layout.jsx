import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white selection:bg-zinc-800 antialiased">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:flex relative flex-col justify-between bg-zinc-950 border-r border-zinc-900 p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-zinc-800/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              Style Hub v1.0
            </span>
          </div>

          <div className="relative z-10 my-auto max-w-md space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Style Hub
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed font-light">
              Build, manage, and scale your online fashion storefront with a
              highly optimized, lightning-fast storefront system.
            </p>
          </div>

          <div className="relative z-10 text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Style Hub Inc. All rights
            reserved.
          </div>
        </div>

        <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 py-12 bg-black">
          <div className="w-full max-w-md bg-zinc-900/40 p-8 rounded-2xl border border-zinc-900 backdrop-blur-md shadow-xl shadow-black/40">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

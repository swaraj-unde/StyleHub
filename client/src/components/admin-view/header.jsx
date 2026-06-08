import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function AdminHeader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950 text-white">
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="lg:hidden text-white hover:bg-zinc-900"
      >
        <AlignJustify className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      
      <div className="ml-auto">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

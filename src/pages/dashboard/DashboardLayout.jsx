import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import logo from "../../assets/logo.png";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#070C18] border-b border-white/10 flex items-center">
        {/* Menu button */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 text-white"
        >
          <Menu size={22} />
        </button>

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="Logo" className="h-8" />
        </div>
      </div>

      <div className="flex min-h-screen pt-14 lg:pt-0">
        {/* ===== DESKTOP SIDEBAR ===== */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        {/* ===== MOBILE SIDEBAR DRAWER ===== */}
        {open && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 z-50 w-72 bg-[#070C18]">
              <DashboardSidebar onClose={() => setOpen(false)} />
            </div>
          </>
        )}

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

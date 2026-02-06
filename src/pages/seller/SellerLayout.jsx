import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

export default function SellerLayout() {
  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">
      <SellerSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          <Outlet /> {/* REQUIRED */}
        </div>
      </main>
    </div>
  );
}
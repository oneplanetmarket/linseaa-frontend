import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Linkedin,
  ClipboardList,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export default function DashboardSidebar({ onClose }) {
  const location = useLocation();
  const { pathname } = location;
  const { user, logout, axios } = useAppContext();

  const [walletBalance, setWalletBalance] = useState(0);

  /* ================= FETCH LIVE WALLET ================= */
  const fetchWallet = async () => {
    try {
      const { data } = await axios.get("/api/wallet/me");
      if (data.success) {
        setWalletBalance(data.balance || 0);
      }
    } catch (err) {
      console.error("Sidebar wallet fetch failed");
    }
  };

  /* 🔥 REFRESH WALLET ON ROUTE CHANGE */
  useEffect(() => {
    fetchWallet();
  }, [pathname]);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "LinkedIn", path: "/dashboard/linkedin", icon: Linkedin },
    { name: "Tasks", path: "/dashboard/tasks", icon: ClipboardList },
    { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const userName = user?.name || user?.email || "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="w-72 bg-[#070C18] border-r border-white/5 flex flex-col h-full">
      {/* Logo */}
      <Link
        to="/dashboard"
        onClick={onClose}
        className="p-6 border-b border-white/5 flex items-center justify-center"
      >
        <img src={logo} alt="Logo" className="h-10 object-contain" />
      </Link>

      {/* User */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black">
            {initials}
          </div>
          <div>
            <p className="font-medium">{userName}</p>
            <p className="text-xs text-white/50">
              • {user?.profileCompleted ? "Active" : "Incomplete"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item, i) => {
          const active = pathname === item.path;
          return (
            <Link
              key={i}
              to={item.path}
              onClick={onClose} // 🔥 close drawer on mobile
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                ${
                  active
                    ? "bg-emerald-500 text-black font-medium"
                    : "hover:bg-white/5 text-white/80"
                }
              `}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 🔥 LIVE BALANCE */}
      <div className="px-6 mb-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
          <p className="text-sm text-white/60">Available Balance</p>
          <p className="text-2xl font-bold text-emerald-400">
            ₹{walletBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          onClose?.(); // 🔥 close drawer on mobile
        }}
        className="flex items-center gap-2 px-6 py-4 text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  );
}


import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  CreditCard,
  Mail,
  Send,
  Linkedin,
  LogOut,
  Wallet,
  ClipboardList,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import logo from "../../assets/logo.png";

export default function SellerSidebar() {
  const { logout } = useAppContext();

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-[#020617]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-9 object-contain" />
      </div>

      {/* Admin Card */}
      <div className="px-4 py-4">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="font-medium">Admin Panel</p>
          <p className="text-xs text-white/50">Seller Access</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <NavItem to="/seller" icon={LayoutDashboard} label="Dashboard" />

        <NavItem to="/seller/user-signups" icon={Users} label="User Signups" />

        <NavItem
          to="/seller/user-verifications"
          icon={UserCheck}
          label="Profile Verifications"
        />

        <NavItem
          to="/seller/approved-users"
          icon={UserCheck}
          label="Approved Users"
        />

        <NavItem
          to="/seller/rejected-users"
          icon={UserX}
          label="Rejected Users"
        />

        <NavItem
          to="/seller/linkedin-submissions"
          icon={Linkedin}
          label="LinkedIn Submissions"
        />

        <NavItem to="/seller/payments" icon={CreditCard} label="Payments" />

        {/* 🔥 NEW FEATURES */}
        <NavItem
          to="/seller/withdrawals"
          icon={Wallet}
          label="Withdrawals"
        />

        <NavItem
          to="/seller/tasks"
          icon={ClipboardList}
          label="Create Tasks"
        />

        <NavItem
          to="/seller/newsletter-subscribers"
          icon={Mail}
          label="Newsletter Subscribers"
        />

        <NavItem
          to="/seller/send-newsletter"
          icon={Send}
          label="Send Newsletter"
        />
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-400 text-sm hover:text-red-500"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/seller"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${
          isActive
            ? "bg-emerald-500 text-black"
            : "text-white/70 hover:bg-white/5"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}
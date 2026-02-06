import {
  CheckCircle,
  Link2,
  Wallet,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user, axios } = useAppContext();

  const [walletBalance, setWalletBalance] = useState(0);

  const userName = user?.name || "User";

  /* 🔥 FETCH LIVE WALLET */
  const fetchWallet = async () => {
    try {
      const { data } = await axios.get("/api/wallet/me");
      if (data.success) {
        setWalletBalance(data.balance || 0);
      }
    } catch {}
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-white/60 mt-1">
          Here's what's happening with your account
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card
          title="Available Balance"
          value={`₹${walletBalance.toFixed(2)}`}
          sub="Updated just now"
          icon={Wallet}
        />
        <Card
          title="Account Status"
          value={user?.profileCompleted ? "Active" : "Incomplete"}
          sub={
            user?.profileCompleted
              ? "Profile completed"
              : "Complete profile to activate"
          }
          icon={CheckCircle}
        />
        <Card
          title="Tasks Completed"
          value={user?.tasksCompleted || "0"}
          sub="Complete tasks to earn"
          icon={ClipboardList}
        />
        <Card
          title="LinkedIn Status"
          value={user?.linkedinConnected ? "Connected" : "Not Connected"}
          sub="Connect to start"
          icon={Link2}
        />
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActionCard
          title="Complete Your Profile"
          desc="Add payment details and LinkedIn URL"
          btn="Complete Profile"
          onClick={() => navigate("/dashboard/profile")}
        />

        <ActionCard
          title="Withdraw Funds"
          desc="Request a payout to your account"
          btn="Request Payout"
          disabled={walletBalance < 100}
          onClick={() => navigate("/dashboard/wallet")}
        />

        <ActionCard
          title="View Tasks"
          desc="Find new earning opportunities"
          btn="View Tasks"
          onClick={() => navigate("/dashboard/tasks")}
        />

        <ActionCard
          title="Account Settings"
          desc="Manage your profile and preferences"
          btn="Open Settings"
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ title, value, sub, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="text-emerald-400" size={22} />
        <p className="text-white/60 text-sm">{title}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-white/40 mt-1">{sub}</p>
    </div>
  );
}

function ActionCard({ title, desc, btn, onClick, disabled }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-white/60 text-sm mt-1">{desc}</p>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            disabled
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : "bg-emerald-500 text-black hover:bg-emerald-400"
          }
        `}
      >
        {btn}
      </button>
    </div>
  );
}
import {
    Users,
    FileCheck,
    UserCheck,
    UserX,
    Wallet
  } from "lucide-react";
  
  export default function SellerDashboard() {
    const stats = [
      {
        title: "Total Users",
        value: 1240,
        icon: Users,
        color: "text-blue-400",
      },
      {
        title: "Profiles Submitted",
        value: 420,
        icon: FileCheck,
        color: "text-yellow-400",
      },
      {
        title: "Approved Users",
        value: 312,
        icon: UserCheck,
        color: "text-emerald-400",
      },
      {
        title: "Rejected Users",
        value: 108,
        icon: UserX,
        color: "text-red-400",
      },
      {
        title: "Total Earnings",
        value: "₹85,000",
        icon: Wallet,
        color: "text-purple-400",
      },
    ];
  
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-white/50 text-sm">
            Overview of platform activity
          </p>
        </div>
  
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 transition"
            >
              <item.icon className={`${item.color}`} size={28} />
              <div>
                <p className="text-sm text-white/60">{item.title}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Verify Profiles"
            desc="Review and approve submitted profiles"
          />
          <DashboardCard
            title="Manage Payments"
            desc="Send earnings to approved users"
          />
          <DashboardCard
            title="Send Newsletter"
            desc="Engage users with updates"
          />
        </div>
      </div>
    );
  }
  
  /* Small reusable card */
  function DashboardCard({ title, desc }) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-white/50 mt-1">{desc}</p>
      </div>
    );
  }
  
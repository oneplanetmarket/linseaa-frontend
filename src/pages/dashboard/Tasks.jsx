import {
    Lock,
    ClipboardList,
    CheckCircle,
    Clock,
    DollarSign,
  } from "lucide-react";
  import { useAppContext } from "../../context/AppContext";
  
  export default function Tasks() {
    const { user } = useAppContext();
  
    // Conditions (adjust later when backend is ready)
    const profileApproved = user?.profileApproved;
    const linkedinConnected = user?.linkedinConnected;
  
    const tasksUnlocked = profileApproved && linkedinConnected;
  
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-white/60">
            Complete tasks to earn money
          </p>
        </div>
  
        {/* Locked Warning */}
        {!tasksUnlocked && (
          <div className="glass-card flex items-start gap-4 border border-yellow-500/30">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Lock className="text-yellow-400" size={22} />
            </div>
            <div>
              <p className="font-semibold text-white">Tasks Locked</p>
              <p className="text-sm text-white/70 mt-1">
                Complete your profile and LinkedIn verification to unlock tasks.
              </p>
            </div>
          </div>
        )}
  
        {/* Available Tasks */}
        <div className="glass-card text-center space-y-4">
          <div className="flex items-center gap-2 justify-center text-lg font-semibold">
            <ClipboardList size={20} />
            Available Tasks
          </div>
  
          <p className="text-sm text-white/60">
            Accept tasks to start earning
          </p>
  
          <div className="py-10 text-white/50">
            <ClipboardList size={36} className="mx-auto mb-3 opacity-40" />
            <p>No tasks available right now</p>
            <p className="text-xs mt-1">
              Check back later for new opportunities
            </p>
          </div>
        </div>
  
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<CheckCircle className="text-emerald-400" />}
            value="0"
            label="Completed"
          />
          <StatCard
            icon={<Clock className="text-blue-400" />}
            value="0"
            label="In Progress"
          />
          <StatCard
            icon={<DollarSign className="text-emerald-400" />}
            value="$0.00"
            label="Total Earned"
          />
        </div>
      </div>
    );
  }
  
  /* ================= COMPONENT ================= */
  
  function StatCard({ icon, value, label }) {
    return (
      <div className="glass-card flex items-center gap-4">
        <div className="p-3 rounded-lg bg-white/10">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-white/60">{label}</p>
        </div>
      </div>
    );
  }
  
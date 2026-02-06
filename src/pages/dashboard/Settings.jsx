import { Bell, Shield, User } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAppContext();

  // Notification states (later sync with backend)
  const [emailNotif, setEmailNotif] = useState(true);
  const [taskAlerts, setTaskAlerts] = useState(true);

  // Security states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill all password fields");
      return;
    }
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-white/60">
          Manage your account preferences
        </p>
      </div>

      {/* Notifications */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="text-emerald-400" />
          <div>
            <h2 className="font-semibold">Notifications</h2>
            <p className="text-sm text-white/60">
              Configure how you receive updates
            </p>
          </div>
        </div>

        <Toggle
          label="Email Notifications"
          desc="Receive updates about your account"
          value={emailNotif}
          onChange={setEmailNotif}
        />

        <Toggle
          label="Task Alerts"
          desc="Get notified when new tasks are available"
          value={taskAlerts}
          onChange={setTaskAlerts}
        />
      </div>

      {/* Security */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="text-emerald-400" />
          <div>
            <h2 className="font-semibold">Security</h2>
            <p className="text-sm text-white/60">
              Update your password and security settings
            </p>
          </div>
        </div>

        <div>
          <label className="input-label">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input-dark"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="input-label">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-dark"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handlePasswordUpdate}
          className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm w-fit"
        >
          Update Password
        </button>
      </div>

      {/* Account Info */}
      <div className="glass-card space-y-6">
        <div className="flex items-center gap-3">
          <User className="text-emerald-400" />
          <h2 className="font-semibold">Account Information</h2>
        </div>

        <InfoRow label="Email" value={user?.email || "-"} />
        <InfoRow
          label="Account ID"
          value={user?._id?.slice(0, 8) + "..." || "-"}
        />
        <InfoRow
          label="Member Since"
          value={
            user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "2/1/2026"
          }
        />
        <InfoRow
          label="Payment Method"
          value={user?.paymentMethod || "Not set"}
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Toggle({ label, desc, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-white/60">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full relative transition ${
          value ? "bg-emerald-500" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-black rounded-full transition ${
            value ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-3 text-sm">
      <span className="text-white/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

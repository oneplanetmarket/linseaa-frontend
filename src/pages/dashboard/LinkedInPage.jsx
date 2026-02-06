import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Linkedin,
  ShieldCheck,
  AlertTriangle,
  RefreshCcw,
  IndianRupee,
} from "lucide-react";

export default function LinkedInPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    googleCode: "",
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get("/api/user/linkedin-status", {
        withCredentials: true,
      });
      setData(res.data);
    } catch {
      toast.error("Failed to load LinkedIn status");
    }
  };

  if (!data) return null;

  /* ================= PROFILE STATUS ================= */

  if (data.status === "pending") {
    return (
      <StatusCard
        icon={AlertTriangle}
        color="yellow"
        title="Profile Under Review"
        text="Your profile is being reviewed. LinkedIn will unlock after approval."
      />
    );
  }

  if (data.status === "rejected") {
    return (
      <StatusCard
        icon={AlertTriangle}
        color="red"
        title="Profile Rejected"
        text={`Reason: ${data.rejectionReason}`}
      />
    );
  }

  /* ================= LINKEDIN FLOW ================= */

  if (data.linkedinStatus === "submitted") {
    return (
      <StatusCard
        icon={AlertTriangle}
        color="yellow"
        title="LinkedIn Submitted"
        text="Your LinkedIn details are under admin review."
      />
    );
  }

  if (data.linkedinStatus === "approved") {
    return (
      <StatusCard
        icon={ShieldCheck}
        color="green"
        title="LinkedIn Approved"
        text="Connection request approved. Admin will log in shortly."
      />
    );
  }

  if (data.linkedinStatus === "connected") {
    return (
      <StatusCard
        icon={AlertTriangle}
        color="yellow"
        title="Connection Sent"
        text="Waiting for admin login verification."
      />
    );
  }

  if (data.linkedinStatus === "logged_in") {
    return (
      <div className="glass-card border border-emerald-500/30 space-y-3">
        <div className="flex items-center gap-3 text-emerald-400">
          <ShieldCheck size={22} />
          <p className="font-semibold">LinkedIn Verified & Active</p>
        </div>
  
        <p className="text-white text-sm">
          Your daily payment of{" "}
          <span className="font-semibold text-emerald-400">
            ₹{data.earningRate}
          </span>{" "}
          will be credited by EOD
        </p>
      </div>
    );
  }
  /* ================= FORM (not_submitted OR rejected) ================= */

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Connect LinkedIn</h1>
        <p className="text-white/60">
          Submit your LinkedIn credentials to start earning
        </p>
      </div>

      {data.linkedinStatus === "rejected" && (
        <div className="glass-card border border-red-500/30 text-red-400 flex gap-3">
          <RefreshCcw size={18} />
          LinkedIn rejected. Please submit correct details.
        </div>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setLoading(true);
            await axios.post("/api/user/submit-linkedin", form, {
              withCredentials: true,
            });
            toast.success("LinkedIn submitted for review");
            fetchStatus();
          } catch {
            toast.error("Submission failed");
          } finally {
            setLoading(false);
          }
        }}
        className="glass-card space-y-4"
      >
        <Input
          label="LinkedIn Email"
          placeholder="example@email.com"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          label="LinkedIn Password"
          type="password"
          placeholder="••••••••"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Input
          label="Google Authenticator Code"
          placeholder="Paste code here"
          onChange={(e) =>
            setForm({ ...form, googleCode: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="primary-btn w-full flex items-center justify-center gap-2"
        >
          <Linkedin size={18} />
          {loading ? "Submitting..." : "Submit LinkedIn"}
        </button>
      </form>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <input className="input-dark" {...props} />
    </div>
  );
}

function StatusCard({ icon: Icon, color, title, text }) {
  const map = {
    green: "border-emerald-500/30 text-emerald-400",
    yellow: "border-yellow-500/30 text-yellow-400",
    red: "border-red-500/30 text-red-400",
  };

  return (
    <div className={`glass-card border ${map[color]} flex gap-4`}>
      <Icon size={22} />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}

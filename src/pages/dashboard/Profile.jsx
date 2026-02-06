import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { CheckCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Profile() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    contactEmail: user?.email || "",
    contactMobile: "",
    linkedinUrl: "",
    linkedinYear: "",
    linkedinConnections: "",
    paymentMethod: "",
    paymentIdentifier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ✅ REAL SUBMIT TO BACKEND */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.linkedinUrl || !formData.paymentMethod) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/user/submit-profile",
        {
          contactEmail: formData.contactEmail,
          contactMobile: formData.contactMobile,
          linkedinUrl: formData.linkedinUrl,
          linkedinYear: formData.linkedinYear,
          linkedinConnections: formData.linkedinConnections,
          paymentMethod: formData.paymentMethod,
          paymentIdentifier: formData.paymentIdentifier,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Profile submitted for approval");

        setTimeout(() => {
          navigate("/dashboard/linkedin");
        }, 800);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-white/60">
          Complete your profile to get approved
        </p>
      </div>

      {/* Status */}
      <div className="glass-card">
        <p className="text-sm text-white/60">Registration Status</p>
        <p className="mt-2 text-sm text-yellow-400 font-medium">
          ● Incomplete
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <p className="text-sm text-white/50">
            This information will be used to verify your account
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <DisabledInput
            label="Account Email"
            value={user?.email || ""}
            note="This is your login email and cannot be changed"
          />

          <Input
            label="Contact Email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            note="We'll use this email for communication"
          />

          <Input
            label="Contact Mobile No"
            name="contactMobile"
            value={formData.contactMobile}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
          />

          <Input
            label="LinkedIn Profile URL"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/yourprofile"
            full
          />

          <Input
            label="LinkedIn Profile Created Year"
            name="linkedinYear"
            value={formData.linkedinYear}
            onChange={handleChange}
            placeholder="2019"
          />

          <Input
            label="Connections You Have"
            name="linkedinConnections"
            value={formData.linkedinConnections}
            onChange={handleChange}
            placeholder="500"
          />

          <CustomSelect
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(value) =>
              setFormData({ ...formData, paymentMethod: value })
            }
          />

          <Input
            label="Payment Details (Where you receive money)"
            name="paymentIdentifier"
            value={formData.paymentIdentifier}
            onChange={handleChange}
            placeholder="UPI ID / Bank Account / PayPal Email"
            full
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="primary-btn flex items-center gap-2 disabled:opacity-50"
        >
          <CheckCircle size={18} />
          {loading ? "Submitting..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}

/* ================= INPUTS ================= */

function Input({ label, note, full, ...props }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="input-label">{label}</label>
      <input className="input-dark" {...props} />
      {note && <p className="input-note">{note}</p>}
    </div>
  );
}

function DisabledInput({ label, value, note }) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <input
        value={value}
        disabled
        className="input-dark opacity-50 cursor-not-allowed"
      />
      {note && <p className="input-note">{note}</p>}
    </div>
  );
}

/* ================= PAYMENT DROPDOWN ================= */

function CustomSelect({ label, value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "paypal", label: "PayPal" },
    { value: "upi", label: "UPI" },
    { value: "bank", label: "Bank Transfer" },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <label className="input-label">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-dark flex justify-between items-center"
      >
        <span className={selected ? "text-white" : "text-white/40"}>
          {selected?.label || "Select method"}
        </span>
        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full glass-card p-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition
                ${
                  value === option.value
                    ? "bg-emerald-500 text-black"
                    : "hover:bg-white/10 text-white"
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserProfileVerifications() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "/api/seller/user-verifications",
        { withCredentials: true }
      );

      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      toast.error("Failed to load verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approve = async (id) => {
    try {
      await axios.post(
        `/api/seller/approve-user/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("User approved");
      fetchUsers();
    } catch {
      toast.error("Approval failed");
    }
  };

  const reject = async (id) => {
    const reason = prompt("Reason for rejection?");
    if (!reason) return;

    try {
      await axios.post(
        `/api/seller/reject-user/${id}`,
        { reason },
        { withCredentials: true }
      );
      toast.success("User rejected");
      fetchUsers();
    } catch {
      toast.error("Rejection failed");
    }
  };

  if (loading) return <p>Loading verification requests...</p>;
  if (!users.length) return <p>No pending verification requests</p>;

  return (
    <div className="space-y-6">
      {users.map((u) => (
        <div key={u._id} className="glass-card space-y-3">
          {/* BASIC INFO */}
          <div>
            <p className="font-semibold text-lg">{u.name}</p>
            <p className="text-sm text-white/60">{u.email}</p>
          </div>

          {/* CONTACT */}
          <div className="text-sm">
            <p><b>Contact Email:</b> {u.contactEmail || "—"}</p>
            <p><b>Contact Mobile:</b> {u.contactMobile || "—"}</p>
          </div>

          {/* LINKEDIN INFO */}
          <div className="text-sm">
            <p>
              <b>LinkedIn URL:</b>{" "}
              {u.linkedinUrl ? (
                <a
                  href={u.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  View Profile
                </a>
              ) : (
                "—"
              )}
            </p>
            <p><b>LinkedIn Created Year:</b> {u.linkedinYear || "—"}</p>
            <p><b>Connections:</b> {u.linkedinConnections || "—"}</p>
          </div>

          {/* PAYMENT INFO */}
          <div className="text-sm">
            <p><b>Payment Method:</b> {u.paymentMethod || "—"}</p>
            <p><b>Payment Details:</b> {u.paymentIdentifier || "—"}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => approve(u._id)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(u._id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
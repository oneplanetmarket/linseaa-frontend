import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MoreVertical, Wallet } from "lucide-react";
import { useAppContext } from "../../context/AppContext"; // 🔥 ADD

export default function Payments() {
  const { refetchUser } = useAppContext(); // 🔥 ADD

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [history, setHistory] = useState([]);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const res = await axios.get("/api/seller/payments", {
      withCredentials: true,
    });
    if (res.data.success) setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= FETCH TRANSACTION HISTORY ================= */
  const fetchHistory = async (id) => {
    const res = await axios.get(
      `/api/seller/payments/${id}/history`,
      { withCredentials: true }
    );
    setHistory(res.data.transactions || []);
  };

  /* ================= SEND MONEY (FIXED) ================= */
  const sendMoney = async () => {
    if (!amount || amount <= 0) {
      return toast.error("Enter valid amount");
    }

    try {
      await axios.post(
        "/api/wallet/add", // 🔥 FIXED API
        {
          userId: selected._id,
          amount: Number(amount),
          remark,
        },
        { withCredentials: true }
      );

      toast.success("Money sent successfully");

      // 🔥 THIS IS THE MOST IMPORTANT FIX
      await refetchUser();

      // Refresh seller table + modal
      fetchUsers();
      fetchHistory(selected._id);

      setAmount("");
      setRemark("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send money"
      );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seller Payments</h1>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Wallet</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-white/10">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="flex items-center gap-2">
                  <Wallet size={14} /> ₹{u.walletBalance}
                </td>
                <td>
                  <span className="badge">{u.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelected(u);
                      fetchHistory(u._id);
                    }}
                  >
                    <MoreVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="glass-card w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">
              Wallet Actions — {selected.name}
            </h2>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-dark"
            />

            <input
              placeholder="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="input-dark"
            />

            <button
              onClick={sendMoney}
              className="primary-btn w-full"
            >
              Confirm Send
            </button>

            <h3 className="font-semibold pt-4">
              Transaction History
            </h3>

            <div className="max-h-48 overflow-y-auto text-sm">
              {history.map((t) => (
                <div
                  key={t.transactionId}
                  className="border-b border-white/10 py-2"
                >
                  <p>
                    {t.type.toUpperCase()} ₹{t.amount}
                  </p>
                  <p className="text-white/50">
                    {t.remark} •{" "}
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="text-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
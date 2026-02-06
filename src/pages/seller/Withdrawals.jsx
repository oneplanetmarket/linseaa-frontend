import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function Withdrawals() {
  const { axios } = useAppContext();
  const [requests, setRequests] = useState([]);

  const fetchWithdrawals = async () => {
    const res = await axios.get("/api/seller/withdrawals", {
      withCredentials: true,
    });

    if (res.data.success) {
      setRequests(res.data.requests);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const updateStatus = async (req, status) => {
    await axios.post(
      "/api/seller/withdrawals/update",
      {
        userId: req.userId,
        withdrawalId: req.withdrawalId,
        status,
      },
      { withCredentials: true }
    );

    toast.success(`Withdrawal ${status}`);
    fetchWithdrawals();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.withdrawalId}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{req.name}</p>
              <p className="text-sm text-white/60">{req.email}</p>
              <p className="text-sm mt-1">
                ₹{req.amount} — {req.paymentMethod}
              </p>
              <p className="text-xs text-white/50">
                {req.paymentIdentifier}
              </p>
            </div>

            <div className="flex gap-3">
              {req.status === "pending" ? (
                <>
                  <button
                    onClick={() => updateStatus(req, "approved")}
                    className="px-4 py-2 bg-emerald-500 text-black rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`capitalize font-semibold ${
                    req.status === "approved"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {req.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import {
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function Wallet() {
  const { axios } = useAppContext();

  const [available, setAvailable] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // 🔥 TEMPORARILY ENABLE WITHDRAWAL
  const paymentMethodSet = true;

  const fetchWallet = async () => {
    try {
      const { data } = await axios.get("/api/wallet/me");
      if (data.success) {
        setAvailable(data.balance);
        setTransactions(data.transactions || []);
      }
    } catch {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount < 100) {
      return toast.error("Minimum withdrawal is ₹100");
    }

    if (withdrawAmount > available) {
      return toast.error("Insufficient balance");
    }

    try {
      setProcessing(true);

      const { data } = await axios.post("/api/wallet/withdraw", {
        amount: Number(withdrawAmount),
      });

      if (data.success) {
        toast.success("Withdrawal requested");
        setWithdrawAmount("");
        fetchWallet();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Withdrawal failed");
    } finally {
      setProcessing(false);
    }
  };

  const totalEarned =
    transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  if (loading) return <p className="text-white/60">Loading wallet...</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Wallet</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Stat label="Available Balance" value={available} />
        <Stat label="Pending" value={0} />
        <Stat label="Total Earned" value={totalEarned} />
      </div>

      {/* Withdrawal */}
      <div className="glass-card space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ArrowUpRight size={18} />
          Request Withdrawal
        </h2>

        <input
          type="number"
          placeholder="₹ 0.00"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="input-dark"
        />

        <p className="text-xs text-white/40">
          Minimum withdrawal: ₹100
        </p>

        <button
          onClick={handleWithdraw}
          disabled={available < 100 || processing}
          className="primary-btn"
        >
          {processing ? "Processing..." : "Request Withdrawal"}
        </button>
      </div>

      {/* Transactions */}
      <div className="glass-card space-y-4">
        <h2 className="text-lg font-semibold">Transaction History</h2>

        {!transactions.length && (
          <p className="text-white/60">No transactions yet</p>
        )}

        {transactions.map((t) => (
          <div key={t.transactionId} className="border-b py-2 text-sm">
            <p>
              {t.type.toUpperCase()} ₹{t.amount}
            </p>
            <p className="text-white/50">{t.remark}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="glass-card">
      <p className="text-sm text-white/60">{label}</p>
      <p className="text-2xl font-bold">₹{value.toFixed(2)}</p>
    </div>
  );
}
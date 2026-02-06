import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:4000/api/seller/login",
        { email, password },
        { withCredentials: true }
      );

      if (!data.success) {
        return toast.error(data.message || "Login failed");
      }

      toast.success("Seller login successful");
      window.location.href = "/seller";
    } catch (err) {
      toast.error("Invalid seller credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="glass-card w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Seller Login</h2>

        <input
          type="email"
          placeholder="Seller Email"
          className="input-dark"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input-dark"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="primary-btn w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
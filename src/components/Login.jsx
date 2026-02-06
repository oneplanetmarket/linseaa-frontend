import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = ({ isPage = false }) => {
  const { setUser, axios, navigate } = useAppContext();
  const location = useLocation();

  const [state, setState] = React.useState("register"); // register | login
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agree, setAgree] = React.useState(false);

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "register" && !agree) {
      toast.error("Please accept Linseaa – Terms & Conditions");
      return;
    }

    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);

        const redirectPath =
          location.state?.from?.pathname ||
          (data.user.role === "seller"
            ? "/seller"
            : data.user.role === "producer"
            ? "/producer"
            : "/dashboard");

        navigate(redirectPath, { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Authentication failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white">
      <h2 className="text-2xl font-bold">
        {state === "register" ? "Create your account" : "Welcome back"}
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        {state === "register"
          ? "Join and start earning today"
          : "Sign in to access your dashboard"}
      </p>

      <form onSubmit={onSubmitHandler} className="mt-8 space-y-4">
        {/* FULL NAME */}
        {state === "register" && (
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none"
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none"
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none"
            required
          />
        </div>

        {/* TERMS */}
        {state === "register" && (
          <label className="flex items-start gap-2 text-sm text-gray-400 mt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree to{" "}
              <Link
                to="/terms"
                target="_blank"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                Linseaa – Terms & Conditions
              </Link>
            </span>
          </label>
        )}

        {/* BUTTON */}
        <button
          disabled={state === "register" && !agree}
          className={`w-full mt-4 py-3 rounded-lg font-semibold transition ${
            state === "register" && !agree
              ? "bg-white/20 text-white/40 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 text-black"
          }`}
        >
          {state === "register" ? "Create Account →" : "Sign In →"}
        </button>
      </form>

      {/* SWITCH */}
      <p className="text-center text-sm text-gray-400 mt-6">
        {state === "register" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("login");
                setAgree(false);
              }}
              className="text-emerald-400 cursor-pointer"
            >
              Sign in
            </span>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-emerald-400 cursor-pointer"
            >
              Create account
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;
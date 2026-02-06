import React from "react";
import Login from "../components/Login";
import { assets } from "../assets/assets"; // ✅ import assets

const Auth = () => {
  return (
    <div className="min-h-screen w-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-[#020617] via-[#020617] to-[#022c22]">

      {/* LEFT SECTION (Marketing) */}
      <div className="hidden lg:flex flex-col justify-center px-16 relative overflow-hidden">

        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src={assets.logo}
            alt="LinkedRent"
            className="h-9 w-auto object-contain"
          />
          <p className="text-sm text-gray-400">
            Monetize Your Network
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
          Start Earning <br />
          <span className="text-emerald-400">In Minutes</span>
        </h1>

        {/* Steps */}
        <div className="mt-10 space-y-5">
          <div className="flex items-center gap-3 text-gray-300">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
              1
            </span>
            Complete your profile
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
              2
            </span>
            Link your LinkedIn account
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
              3
            </span>
            Get paid for tasks
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* RIGHT SECTION (FORM) */}
      <div className="flex items-center justify-center px-6">
        <Login isPage />
      </div>
    </div>
  );
};

export default Auth;

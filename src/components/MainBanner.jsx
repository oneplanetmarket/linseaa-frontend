import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <section className="relative w-screen min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#022c22] overflow-hidden">
      
      {/* Soft Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl text-center">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-emerald-500/30 text-emerald-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Trusted by 50,000+ professionals
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Turn Your LinkedIn
            <br />
            <span className="text-emerald-400">Into Passive Income</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
            Monetize your professional network securely. Get paid for sharing your
            LinkedIn presence while maintaining complete control.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition text-white font-medium"
            >
              Start Earning Today →
            </Link>

            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-gray-600 hover:border-emerald-500 text-white transition"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-emerald-400 text-3xl font-bold">$2M+</p>
              <p className="text-gray-400 text-sm mt-1">Paid to Users</p>
            </div>

            <div>
              <p className="text-emerald-400 text-3xl font-bold">50K+</p>
              <p className="text-gray-400 text-sm mt-1">Active Users</p>
            </div>

            <div>
              <p className="text-emerald-400 text-3xl font-bold">24h</p>
              <p className="text-gray-400 text-sm mt-1">Avg. Approval</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MainBanner;

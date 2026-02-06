import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Linkedin,
  DollarSign,
  ShieldCheck,
  Zap,
  Headphones,
  CheckCircle,
} from "lucide-react";

const Categories = () => {
  return (
    <section className="w-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#022c22] overflow-hidden">

      {/* ================= HOW IT WORKS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How It Works
        </h2>
        <p className="mt-3 text-gray-400 text-sm md:text-base">
          Simple, secure, and profitable. Start earning in just a few steps.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {/* Step 01 */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-left backdrop-blur">
            <span className="absolute -top-4 left-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              01
            </span>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-6">
              <User size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Create Account
            </h3>
            <p className="mt-2 text-gray-400 text-sm">
              Sign up and complete your profile with payment details and LinkedIn URL.
            </p>
          </div>

          {/* Step 02 */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-left backdrop-blur">
            <span className="absolute -top-4 left-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              02
            </span>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-6">
              <Linkedin size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Connect LinkedIn
            </h3>
            <p className="mt-2 text-gray-400 text-sm">
              Securely link your LinkedIn account. We use bank-grade encryption.
            </p>
          </div>

          {/* Step 03 */}
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-left backdrop-blur">
            <span className="absolute -top-4 left-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              03
            </span>
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-6">
              <DollarSign size={22} />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Get Paid
            </h3>
            <p className="mt-2 text-gray-400 text-sm">
              Complete tasks and withdraw earnings to your preferred payment method.
            </p>
          </div>

        </div>
      </div>

      {/* ================= WHY CHOOSE ================= */}
      <div className="max-w-7xl mx-auto px-6 py-28 grid gap-16 md:grid-cols-2 items-center">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose <span className="text-emerald-400">LinkedRent?</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            We prioritize your security and earnings. Join thousands of professionals who trust us.
          </p>

          <div className="mt-10 space-y-8">

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Bank-Grade Security
                </h4>
                <p className="text-gray-400 text-sm">
                  Your credentials are encrypted with AES-256. We never share your data.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Fast Payments
                </h4>
                <p className="text-gray-400 text-sm">
                  Withdraw earnings within 24–48 hours via UPI, PayPal, or Bank Transfer.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Headphones size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Dedicated Support
                </h4>
                <p className="text-gray-400 text-sm">
                  Our team is available 24/7 to assist you with any questions.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign size={22} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Average Monthly Earnings</p>
              <p className="text-3xl font-bold text-emerald-400">$350+</p>
            </div>
          </div>

          <ul className="space-y-4 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              Passive income stream
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              Flexible task completion
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              No experience required
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-400" />
              Work from anywhere
            </li>
          </ul>
        </div>

      </div>

      {/* ================= FINAL CTA ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Start Earning?
        </h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          Join 50,000+ professionals already earning with LinkedRent.<br />
          It takes less than 5 minutes to get started.
        </p>

        <Link
          to="/auth"
          className="inline-block mt-10 px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-black font-semibold"
        >
          Create Free Account →
        </Link>
      </div>

    </section>
  );
};

export default Categories;

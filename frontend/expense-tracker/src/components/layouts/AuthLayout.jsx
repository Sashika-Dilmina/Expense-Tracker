import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="w-full md:w-[60%] px-12 pt-8 pb-12 flex flex-col">
        <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
          Biz <span className="text-primary">Track</span>
        </h2>
        <p className="text-gray-800 mt-4 mb-8 text-md">
          Smart tracking for your business income, expenses & growth.
        </p>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-[40%] bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 relative p-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute w-64 h-64 bg-white/10 rounded-[40px] -top-12 -left-10 blur-xl" />
        <div className="absolute w-48 h-48 border-[20px] border-white/30 rounded-[40px] top-[25%] -right-8" />
        <div className="absolute w-56 h-56 bg-white/10 rounded-[40px] -bottom-10 -left-8 blur-lg" />

        {/* Stats Card */}
        <div className="absolute top-16 left-12 z-[50] ">
        <StatsInfoCard
         icon={<LuTrendingUpDown />}
        label="Track Your Income & Expenses"
        value="430000"
        color="bg-gradient-to-r from-indigo-500 to-purple-500"
        />
        </div>


        {/* Image */}
        <img
          src={CARD_2}
          alt="Business Card"
          className="absolute bottom-22 right-8 w-64 lg:w-[85%] rounded-2xl shadow-xl shadow-black/30 z-10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-5 bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-300">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[28px] text-white ${color} rounded-full shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-md font-medium text-gray-500">{label}</h6>
        <span className="text-xl font-bold text-gray-800">
          ${Number(value).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

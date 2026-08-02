import React from "react";
import { FaUserPlus, FaGavel, FaReceipt, FaRedo } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-2xl text-[#ff6b4a]" />,
      title: "User Registration",
      description: "Users must register or log in to perform actions like bidding or posting items.",
    },
    {
      icon: <FaGavel className="text-2xl text-[#ff6b4a]" />,
      title: "Role Selection",
      description: "Register as an Auctioneer to host auctions or a Bidder to place bids.",
    },
    {
      icon: <FaReceipt className="text-2xl text-[#ff6b4a]" />,
      title: "Winning & Commission",
      description: "The highest bidder wins. Auctioneers pay 5% platform commission.",
    },
    {
      icon: <FaRedo className="text-2xl text-[#ff6b4a]" />,
      title: "Reposting Items",
      description: "If a bidder fails to pay, the item can be reposted without extra fees.",
    },
  ];

  return (
    <section className="my-8 flex flex-col gap-6">
      <h3 className="text-slate-900 text-xl sm:text-2xl font-bold border-b border-slate-200 pb-2">
        How It <span className="text-[#ff6b4a]">Works</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/10 flex items-center justify-center">
              {step.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm mt-1">{step.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
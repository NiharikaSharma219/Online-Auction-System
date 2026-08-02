import React from "react";
import { Link } from "react-router-dom";

import { 
  FaUserPlus, 
  FaGavel, 
  FaReceipt, 
  FaRedo, 
  FaShippingFast, 
  FaMoneyBillWave 
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-3xl text-[#ff6b4a]" />,
      title: "1. User Registration & Role Selection",
      description:
        "Users can register as either a 'Bidder' or an 'Auctioneer'. Bidders can place bids on items, while Auctioneers can post new auction listings.",
    },
    {
      icon: <FaGavel className="text-3xl text-[#ff6b4a]" />,
      title: "2. Winning Bid & Payment Info",
      description:
        "After winning an auction, the highest bidder receives an email containing the Auctioneer's payment details (Bank Transfer, Easypaisa, PayPal, etc.).",
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-[#ff6b4a]" />,
      title: "3. Direct Payment to Auctioneer",
      description:
        "The winning bidder directly pays the full auctioned amount to the Auctioneer's payment account as provided in the email notification.",
    },
    {
      icon: <FaShippingFast className="text-3xl text-[#ff6b4a]" />,
      title: "4. Item Delivery",
      description:
        "Once the Auctioneer receives and verifies the payment, they pack and deliver the auctioned item directly to the winning bidder.",
    },
    {
      icon: <FaReceipt className="text-3xl text-[#ff6b4a]" />,
      title: "5. Platform Commission (Auctioneer Only)",
      description:
        "After getting paid by the bidder, the Auctioneer must pay a 5% commission to the platform and submit proof. Unpaid commission blocks future listings.",
    },
    {
      icon: <FaRedo className="text-3xl text-[#ff6b4a]" />,
      title: "6. Reposting Items",
      description:
        "If the winning bidder fails or refuses to pay, the Auctioneer can republish the item for bidding again without any extra charges.",
    },
  ];

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1000px] my-6 flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center sm:text-left border-b border-slate-200 pb-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How <span className="text-[#ff6b4a]">BidSphere</span> Works
          </h2>
          <p className="text-slate-500 text-base mt-2">
            Discover how easy it is to buy, sell, and place bids on our platform in simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b4a]/10 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Have questions about fees or bidding?</h3>
            <p className="text-slate-400 text-sm">
              Check out our About Us section or contact support if you need further help.
            </p>
          </div>
          <Link to="/about">
          <button className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap cursor-pointer">
            Learn More
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
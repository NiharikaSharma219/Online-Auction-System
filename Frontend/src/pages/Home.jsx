import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./homeSubComponents/FeaturedAuctions";
import UpcomingAuctions from "./homeSubComponents/UpcomingAuctions";
import Leaderboard from "./homeSubComponents/Leaderboard";
import HowItWorks from "./homeSubComponents/HowItWorks";
import Spinner from "../custom components/Spinner";

const Home = () => {
  const { isAuthenticated, loading: userLoading } = useSelector((state) => state.user || {});
  const { loading: auctionLoading } = useSelector((state) => state.auction || {});

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1050px] my-4 flex flex-col gap-6">
        
        {/* HERO BANNER */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col items-start gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#ff6b4a]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <span className="bg-[#ff6b4a]/20 text-[#ff6b4a] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Live Bidding Platform
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-[650px] leading-tight">
            Transparent Auctions, <span className="text-[#ff6b4a]">Real-Time</span> Bidding.
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-[550px] leading-relaxed">
            Discover rare collectibles, bid on premium items, or host your own auctions with verified secure transactions.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:scale-105"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/auctions"
                className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:scale-105"
              >
                Explore Auctions
              </Link>
            )}
          </div>
        </div>

        {/* SUB-COMPONENTS */}
        {userLoading || auctionLoading ? (
          <Spinner />
        ) : (
          <>
            <FeaturedAuctions />
            <UpcomingAuctions />
            <Leaderboard />
            <HowItWorks />
          </>
        )}

      </div>
    </section>
  );
};

export default Home;
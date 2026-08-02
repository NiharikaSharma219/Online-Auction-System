import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import Spinner from "../custom components/Spinner";
import { ArrowLeft, Calendar, Tag, User, Clock } from "lucide-react";

const AuctionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { auctionDetail, auctionBidders, loading } = useSelector(
    (state) => state.auction || {}
  );

  
  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [dispatch, id]);

  const getAuctionStatus = (startTime, endTime) => {
    if (!startTime || !endTime) return { label: "Unknown", className: "" };
    
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (now < start) {
      return {
        label: "Upcoming",
        className: "bg-blue-50 text-blue-600 border-blue-200",
      };
    } else if (now >= start && now <= end) {
      return {
        label: "Active",
        className: "bg-emerald-50 text-emerald-600 border-emerald-200",
      };
    } else {
      return {
        label: "Ended",
        className: "bg-rose-50 text-rose-600 border-rose-200",
      };
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#f4f6f9]">
        <Spinner />
      </div>
    );
  }

  if (!auctionDetail || Object.keys(auctionDetail).length === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f4f6f9] gap-4">
        <h2 className="text-lg font-bold text-slate-800">Auction Details Not Found</h2>
        <Link
          to="/view-my-auctions"
          className="bg-[#ff6b4a] text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const status = getAuctionStatus(auctionDetail.startTime, auctionDetail.endTime);

  // 👈 Bidders Array Sorting (Highest amount pehle)
  const sortedBidders = auctionBidders && auctionBidders.length > 0 
    ? [...auctionBidders].sort((a, b) => Number(b.amount) - Number(a.amount))
    : [];

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1100px] my-4 flex flex-col gap-6">
        
        {/* Top Back Button & Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/view-my-auctions"
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Auction <span className="text-[#ff6b4a]">Details</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Detailed view and bid history for this auction item.
            </p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Overview */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={auctionDetail.image?.url || auctionDetail.image}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span
                className={`absolute top-8 left-8 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${status.className}`}
              >
                {status.label}
              </span>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-900">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {auctionDetail.description}
              </p>
            </div>
          </div>

          {/* Right Column: Pricing, Info & Bidders History */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
              <h2 className="text-xl font-black text-slate-900">
                {auctionDetail.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Tag className="w-4 h-4 text-[#ff6b4a]" />
                <span>Category: <strong className="text-slate-800">{auctionDetail.category}</strong></span>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">
                    Starting Price
                  </span>
                  <span className="text-2xl font-extrabold text-[#ff6b4a]">
                    ₹{auctionDetail.startingBid}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-slate-500 block">
                    Condition
                  </span>
                  <span className="text-sm font-bold text-slate-800 uppercase">
                    {auctionDetail.condition}
                  </span>
                </div>
              </div>

              {/* Timing Details */}
              <div className="flex flex-col gap-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>
                    <strong>Starts:</strong> {new Date(auctionDetail.startTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    <strong>Ends:</strong> {new Date(auctionDetail.endTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Bidders History Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#ff6b4a]" /> Bidders / Bids
              </h3>

              {sortedBidders.length > 0 ? (
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {sortedBidders.map((bid, index) => (
                    <div
                      key={bid._id || index}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Rank Badge */}
                        <span className="w-6 text-center font-bold text-sm">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </span>

                        <img
                          src={bid.profileImage || "https://via.placeholder.com/40"}
                          alt={bid.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-bold text-slate-800 block">
                            {bid.userName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {bid.createdAt ? new Date(bid.createdAt).toLocaleTimeString() : "Just now"}
                          </span>
                        </div>
                      </div>
                      <span className="font-extrabold text-emerald-600 text-sm">
                        ₹{bid.amount}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  No bids have been placed on this item yet.
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AuctionDetail;
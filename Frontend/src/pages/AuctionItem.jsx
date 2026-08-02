import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import { placeBid } from "../store/slices/bidSlice";
import Spinner from "../custom components/Spinner";

const AuctionItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auctionDetail, auctionBidders, loading } = useSelector(
    (state) => state.auction || {}
  );
  const { user, isAuthenticated } = useSelector(
    (state) => state.user || {}
  );

  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [dispatch, id]);

  // DYNAMIC TIMER & STATUS LOGIC
  useEffect(() => {
    if (!auctionDetail?.startTime || !auctionDetail?.endTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(auctionDetail.startTime).getTime();
      const end = new Date(auctionDetail.endTime).getTime();

      if (now < start) {
        const difference = start - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setIsEnded(false);
        setTimeLeft(`Starts In: ${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (now >= start && now < end) {
        const difference = end - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setIsEnded(false);
        setTimeLeft(`Ends In: ${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setIsEnded(true);
        setTimeLeft("Time's up!");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctionDetail]);

  const handlePlaceBid = (e) => {
    e.preventDefault();
    if (!amount) return;
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData)).then(() => {
      setAmount("");
      dispatch(getAuctionDetail(id));
    });
  };

  

  if (loading || !auctionDetail) {
    return <Spinner />;
  }

  // 💡 TARGETING BIDS DIRECTLY FROM AUCTION DETAIL
  const biddersList =
    (auctionDetail?.bids && auctionDetail.bids.length > 0
      ? auctionDetail.bids
      : null) ||
    (auctionBidders && auctionBidders.length > 0 ? auctionBidders : null) ||
    (auctionDetail?.bidders && auctionDetail.bidders.length > 0
      ? auctionDetail.bidders
      : null) ||
    [];

  // Reverse list so highest/latest bid shows on top
  const sortedBiddersList = [...biddersList].sort((a, b) => {
  const amountA = Number(a.amount || a.bidAmount || a.bid || 0);
  const amountB = Number(b.amount || b.bidAmount || b.bid || 0);
  return amountB - amountA; // Descending Order
});

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1050px] my-4 flex flex-col gap-6">
        
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-[#ff6b4a] hover:underline flex items-center gap-1 w-fit cursor-pointer"
        >
          &larr; Go Back
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-4">
            <div className="w-full h-[230px] sm:h-[280px] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-3">
              <img
                src={
                  auctionDetail.image?.url &&
                  !auctionDetail.image.url.includes("iran.liara.run")
                    ? auctionDetail.image.url
                    : "/placeholder.jpg"
                }
                alt={auctionDetail.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
            </div>

            <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Auction Status
              </span>
              <span
                className={`text-sm sm:text-base font-extrabold ${
                  isEnded ? "text-[#ff6b4a]" : "text-emerald-400"
                }`}
              >
                {timeLeft || "Calculating..."}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="bg-[#ff6b4a]/10 text-[#ff6b4a] text-xs font-bold px-3 py-1 rounded-full w-fit">
                Category: {auctionDetail.category || "General"}
              </span>

              <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-1 rounded-full w-fit uppercase">
                Condition: <span className="text-[#ff6b4a] font-extrabold">{auctionDetail.condition || "New"}</span>
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {auctionDetail.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {auctionDetail.description}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">Starting Price:</span>
                <span className="font-bold text-slate-900">₹{auctionDetail.startingBid}</span>
              </div>

              <div className="flex justify-between items-center text-xs sm:text-sm pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Current / Highest Bid:</span>
                <span className="font-bold text-[#ff6b4a] text-lg">
                  ₹{auctionDetail.currentBid || auctionDetail.startingBid}
                </span>
              </div>
            </div>

            {isEnded ? (
              <div className="bg-[#ff6b4a]/10 border border-[#ff6b4a]/30 p-4 rounded-2xl text-center">
                <p className="text-[#ff6b4a] font-extrabold text-sm sm:text-base">
                  Time's up! This auction has ended.
                </p>
              </div>
            ) : (
              isAuthenticated &&
              user?.role === "Bidder" && (
                <form onSubmit={handlePlaceBid} className="flex gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#ff6b4a]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Place Bid
                  </button>
                </form>
              )
            )}
          </div>
        </div>

        {/* BIDDERS HISTORY TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Bidders <span className="text-[#ff6b4a]">History</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Rank</th>
                  <th className="py-3 px-4 font-bold">Profile</th>
                  <th className="py-3 px-4 font-bold">Username</th>
                  <th className="py-3 px-4 font-bold text-right">Bid Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {sortedBiddersList && sortedBiddersList.length > 0 ? (
                  sortedBiddersList.map((element, index) => {
                    // Smart image extraction
                    const imgUrl =
                      element.profileImage?.url ||
                      element.userId?.profileImage?.url ||
                      element.profileImage ||
                      "/placeholder.jpg";

                    // Smart username extraction
                    const userName =
                      element.userName ||
                      element.userId?.userName ||
                      element.name ||
                      "Bidder " + (index + 1);

                    // Smart bid amount extraction
                    const bidAmount =
                      element.amount ||
                      element.bidAmount ||
                      element.bid ||
                      0;

                    return (
                      <tr
                        key={element._id || element.userId || index}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-bold text-slate-700">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-600 text-xs font-black">
                              🥇 1
                            </span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-xs font-black">
                              🥈 2
                            </span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 text-xs font-black">
                              🥉 3
                            </span>
                          ) : (
                            <span className="text-slate-500 pl-2">#{index + 1}</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <img
                            src={
                              typeof imgUrl === "string" && imgUrl.includes("iran.liara.run")
                                ? "/placeholder.jpg"
                                : imgUrl
                            }
                            alt={userName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.jpg";
                            }}
                          />
                        </td>

                        <td className="py-3 px-4 font-bold text-slate-800">
                          {userName}
                        </td>

                        <td className="py-3 px-4 text-right font-extrabold text-[#ff6b4a]">
                          ₹{bidAmount}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-center text-slate-400 text-sm font-medium"
                    >
                      No bids placed yet. Be the first to bid!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AuctionItem;
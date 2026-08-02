import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../custom components/Spinner";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction || { allAuctions: [], loading: false });

  return (
    <section className="my-8 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2">
        <h3 className="text-slate-900 text-xl sm:text-2xl font-bold">
          Featured <span className="text-[#ff6b4a]">Auctions</span>
        </h3>
        <Link
          to="/auctions"
          className="text-[#ff6b4a] hover:underline text-xs sm:text-sm font-bold"
        >
          View All &rarr;
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : allAuctions && allAuctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAuctions.slice(0, 6).map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <img
                src={auction.image?.url || "https://via.placeholder.com/300"}
                alt={auction.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                    {auction.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {auction.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-semibold">
                  <span className="text-slate-500">Starting Price:</span>
                  <span className="text-[#ff6b4a] text-sm font-bold">
                    ₹{auction.startingBid}
                  </span>
                </div>

                <Link
                  to={`/auction/item/${auction._id}`}
                  className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all mt-1"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl text-center border border-slate-200 text-slate-500 text-sm">
          No active auctions available right now.
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
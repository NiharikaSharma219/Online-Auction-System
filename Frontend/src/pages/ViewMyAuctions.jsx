import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyAuctions } from "../store/slices/auctionSlice";
import Spinner from "../custom components/Spinner";
import CardTwo from "../custom components/CardTwo"; // 👈 Aapka CardTwo component

const ViewMyAuctions = () => {
  const dispatch = useDispatch();

  // Store se myAuctions extract kar rahe hain
  const { myAuctions, loading } = useSelector((state) => state.auction || {});

  useEffect(() => {
    dispatch(getMyAuctions());
  }, [dispatch]);

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1100px] my-4 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-[#ff6b4a]">Auctions</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage and track all the auctions created by you.
            </p>
          </div>
          
          <Link
            to="/create-auction"
            className="w-fit bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
          >
            + Create New Auction
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="w-full h-64 flex justify-center items-center">
            <Spinner />
          </div>
        ) : myAuctions && myAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAuctions.map((element) => (
              <CardTwo
                key={element._id}
                id={element._id}
                title={element.title}
                startingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                imgSrc={element.image}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center gap-4 my-6 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#ff6b4a] flex items-center justify-center font-black text-2xl">
              📦
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                No Auctions Created Yet
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                You haven't listed any items for auction. Click below to start selling!
              </p>
            </div>
            <Link
              to="/create-auction"
              className="bg-[#ff6b4a] hover:bg-[#e05333] text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition-all mt-2"
            >
              Create Auction
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default ViewMyAuctions;
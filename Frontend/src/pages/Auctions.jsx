import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../custom components/Spinner";
import Card from "../custom components/Card"; // 👈 Normal Card Import kiya hai

const Auctions = () => {
  const { allAuctions = [], loading } = useSelector(
    (state) => state.auction || {}
  );

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1050px] my-4 flex flex-col gap-6">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Listed <span className="text-[#ff6b4a]">Auctions</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse through all active, upcoming, and past auction items.
          </p>
        </div>

        {/* AUCTIONS GRID */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.isArray(allAuctions) && allAuctions.length > 0 ? (
              allAuctions.map((element) => (
                <Card
                  key={element._id}
                  id={element._id}
                  title={element.title}
                  startingBid={element.startingBid}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image}
                  category={element.category}
                />
              ))
            ) : (
              <div className="col-span-full bg-white p-8 rounded-3xl text-center text-slate-500 text-sm border border-slate-200">
                No auctions found.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Auctions;
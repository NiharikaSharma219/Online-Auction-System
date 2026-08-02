import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";

const UpcomingAuctions = () => {
  const { allAuctions = [] } = useSelector((state) => state.auction || {});

  const today = new Date();
  const todayString = today.toDateString();

  // 1. Auctions starting today
  const auctionsStartingToday = Array.isArray(allAuctions)
    ? allAuctions.filter((item) => {
        const auctionDate = new Date(item.startTime);
        return auctionDate.toDateString() === todayString;
      })
    : [];

  // 2. Upcoming auctions (Future dates after today)
  const upcomingAuctions = Array.isArray(allAuctions)
    ? allAuctions.filter((item) => {
        const auctionDate = new Date(item.startTime);
        return auctionDate > today && auctionDate.toDateString() !== todayString;
      })
    : [];

  return (
    <div className="flex flex-col gap-8 my-8">
      
      {/* SECTION 1: AUCTIONS FOR TODAY */}
      <section className="flex flex-col gap-4">
        <h3 className="text-slate-900 text-xl sm:text-2xl font-bold border-b border-slate-200 pb-2">
          Auctions <span className="text-[#ff6b4a]">For Today</span>
        </h3>

        <div className="flex flex-col gap-3">
          {auctionsStartingToday.length > 0 ? (
            auctionsStartingToday.map((element) => (
              <Link
                key={element._id}
                to={`/auction/item/${element._id}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={element.image?.url || "https://via.placeholder.com/150"}
                  alt={element.title}
                  className="w-full sm:w-32 h-24 object-cover rounded-xl"
                />
                <div className="flex flex-col justify-between flex-1 w-full gap-2">
                  <h4 className="font-bold text-slate-900 text-base">
                    {element.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span>
                      Starting Price:{" "}
                      <strong className="text-slate-800">₹{element.startingBid}</strong>
                    </span>
                    <span>
                      Starts At:{" "}
                      <strong className="text-[#ff6b4a]">
                        {new Date(element.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="bg-[#ff6b4a]/10 text-[#ff6b4a] p-3 rounded-xl flex items-center gap-2 text-xs font-bold self-end sm:self-center">
                  <RiAuctionFill className="text-lg" />
                  <span>View Item</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white p-6 rounded-2xl text-center text-slate-500 text-sm border border-slate-200">
              No auctions scheduled for today.
            </div>
          )}
        </div>
      </section>


      {/* SECTION 2: UPCOMING AUCTIONS */}
      <section className="flex flex-col gap-4">
        <h3 className="text-slate-900 text-xl sm:text-2xl font-bold border-b border-slate-200 pb-2">
          Upcoming <span className="text-[#ff6b4a]">Auctions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAuctions.length > 0 ? (
            upcomingAuctions.slice(0, 6).map((element) => (
              <Link
                key={element._id}
                to={`/auction/item/${element._id}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
              >
                <img
                  src={element.image?.url || "https://via.placeholder.com/300"}
                  alt={element.title}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h4 className="font-bold text-slate-800 text-base line-clamp-1">
                  {element.title}
                </h4>
                <div className="text-xs text-slate-500 flex justify-between items-center border-t border-slate-100 pt-2">
                  <span>Starts At:</span>
                  <span className="font-semibold text-[#ff6b4a]">
                    {new Date(element.startTime).toLocaleString()}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-white p-6 rounded-2xl text-center text-slate-500 text-sm border border-slate-200">
              No upcoming auctions scheduled right now.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default UpcomingAuctions;
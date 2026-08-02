import React from "react";
import { Link } from "react-router-dom";
import { Tag, Calendar } from "lucide-react";

const Card = ({ title, startingBid, startTime, endTime, imgSrc, id, category }) => {
  const getAuctionStatus = (startTime, endTime) => {
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

  const status = getAuctionStatus(startTime, endTime);

  return (
    /* 👇 Dhyan dein: Route ko '/auction/item/' kar diya hai */
    <Link
      to={`/auction/item/${id}`}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
    >
      <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
        <img
          src={imgSrc?.url || imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${status.className}`}
        >
          {status.label}
        </span>

        {category && (
          <span className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h3 className="font-extrabold text-slate-900 text-lg line-clamp-1 group-hover:text-[#ff6b4a] transition-colors">
          {title}
        </h3>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Starting Bid</span>
            <span className="text-[#ff6b4a] font-extrabold text-base">
              ₹{startingBid}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Starts: {new Date(startTime).toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
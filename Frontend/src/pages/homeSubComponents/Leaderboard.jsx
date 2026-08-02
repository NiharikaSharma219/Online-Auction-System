import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <>
      <section className="my-8 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <h3 className="text-slate-900 text-xl sm:text-2xl font-bold">
            Top 10 <span className="text-[#ff6b4a]">Bidders</span>
          </h3>
          <Link
            to="/leaderboard"
            className="text-[#ff6b4a] hover:underline text-xs sm:text-sm font-bold"
          >
            Go To Leaderboard &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-2 sm:p-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                <th className="p-3">Rank</th>
                <th className="p-3">Profile</th>
                <th className="p-3">Username</th>
                <th className="p-3 text-right">Bid Expenditure</th>
                <th className="p-3 text-right">Auctions Won</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaderboard &&
                leaderboard.slice(0, 10).map((element, index) => {
                  return (
                    <tr key={element._id || index} className="hover:bg-slate-50 transition-all">
                      <td className="p-3 font-bold text-slate-700">#{index + 1}</td>
                      <td className="p-3">
                        <img
                          src={element.profileImage?.url || "https://via.placeholder.com/40"}
                          alt={element.userName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{element.userName}</td>
                      <td className="p-3 text-right font-bold text-[#ff6b4a]">
                        ₹{element.moneySpent || 0}
                      </td>
                      <td className="p-3 text-right text-slate-600 font-semibold">
                        {element.auctionWon || 0}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
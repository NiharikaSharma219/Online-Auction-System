import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../custom components/Spinner";

const LeaderboardPage = () => {
  const { leaderboard = [], loading } = useSelector(
    (state) => state.user || {}
  );

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[1050px] my-4 flex flex-col gap-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bidders <span className="text-[#ff6b4a]">Leaderboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Top performers ranked by total expenditure and auctions won.
          </p>
        </div>

        {/* LEADERBOARD TABLE CARD */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-2 sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-4 font-bold">Rank</th>
                    <th className="py-4 px-4 font-bold">Profile</th>
                    <th className="py-4 px-4 font-bold">Username</th>
                    <th className="py-4 px-4 font-bold text-center">Auctions Won</th>
                    <th className="py-4 px-4 font-bold text-right">Bid Expenditure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    leaderboard.map((element, index) => {
                      return (
                        <tr
                          key={element._id || index}
                          className="hover:bg-slate-50/80 transition-colors"
                        >
                          {/* RANK COLUMN WITH BADGES FOR TOP 3 */}
                          <td className="py-4 px-4 font-bold">
                            {index === 0 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-xs font-black shadow-sm border border-amber-200">
                                🥇 1
                              </span>
                            ) : index === 1 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-700 text-xs font-black shadow-sm border border-slate-300">
                                🥈 2
                              </span>
                            ) : index === 2 ? (
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-xs font-black shadow-sm border border-orange-200">
                                🥉 3
                              </span>
                            ) : (
                              <span className="text-slate-500 pl-3">
                                #{index + 1}
                              </span>
                            )}
                          </td>

                          {/* PROFILE IMAGE */}
                          <td className="py-4 px-4">
                            <img
                              src={
                                element.profileImage?.url ||
                                "https://via.placeholder.com/40"
                              }
                              alt={element.userName}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                            />
                          </td>

                          {/* USERNAME */}
                          <td className="py-4 px-4 font-bold text-slate-800">
                            {element.userName}
                          </td>

                          {/* AUCTIONS WON (Using exact DB field auctionWon) */}
                          <td className="py-4 px-4 text-center font-bold text-slate-700">
                            <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-extrabold text-slate-800">
                              {element.auctionWon || 0}
                            </span>
                          </td>

                          {/* BID EXPENDITURE */}
                          <td className="py-4 px-4 text-right font-extrabold text-[#ff6b4a] text-base">
                            ₹{element.moneySpent || 0}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-slate-500 text-sm font-medium"
                      >
                        No leaderboard data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default LeaderboardPage;
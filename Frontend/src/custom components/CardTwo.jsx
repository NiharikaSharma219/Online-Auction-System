import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAuction, republishAuction } from "../store/slices/auctionSlice";
import { Trash2, RefreshCw, Eye } from "lucide-react";

const CardTwo = ({ title, startingBid, startTime, endTime, imgSrc, id }) => {
  const dispatch = useDispatch();

  // Republish Modal State
  const [openModal, setOpenModal] = useState(false);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this auction?")) {
      dispatch(deleteAuction(id));
    }
  };

  const handleRepublish = (e) => {
    e.preventDefault();
    dispatch(
      republishAuction(id, {
        startTime: newStartTime,
        endTime: newEndTime,
      })
    );
    setOpenModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between p-4 gap-3">
      {/* Image */}
      <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
        <img
          src={imgSrc?.url || imgSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-slate-900 text-base line-clamp-1">{title}</h3>
        <p className="text-xs text-slate-500">
          Starting Bid: <span className="font-bold text-[#ff6b4a]">₹{startingBid}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <Link
          to={`/auction/item/${id}`}
          className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 transition-all"
        >
          <Eye className="w-3.5 h-3.5" /> View Auction
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="flex-1 py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Republish
          </button>
        </div>
      </div>

      {/* Republish Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h3 className="font-bold text-lg text-slate-900">Republish Auction</h3>
            <form onSubmit={handleRepublish} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">
                  New Start Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-semibold block mb-1">
                  New End Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#ff6b4a] text-white rounded-lg text-xs font-semibold"
                >
                  Republish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTwo;
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuctionItemByAdmin } from "../../../store/slices/adminSlice";

const AuctionDetails = () => {
  const { allAuctions } = useSelector((state) => state.auction || {});
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItemByAdmin(id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Auction Items</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Starting Bid</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allAuctions && allAuctions.length > 0 ? (
              allAuctions.map((element) => (
                <tr key={element._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-semibold">{element.title}</td>
                  <td className="p-3">₹{element.startingBid}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleAuctionDelete(element._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No Auctions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionDetails;
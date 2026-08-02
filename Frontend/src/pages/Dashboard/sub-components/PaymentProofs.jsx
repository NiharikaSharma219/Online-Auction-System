import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePaymentProof,
  getSinglePaymentProof,
  updatePaymentProof,
} from "@/store/slices/adminSlice"; // 👈 Perfect adminSlice path

const PaymentProofs = () => {
  const { paymentProofs } = useSelector((state) => state.admin || {});
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentProofDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
    setOpenDrawer(true);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-6">
        <h2 className="text-xl font-bold mb-4">Payment Proofs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 text-left">
            <thead>
              <tr className="bg-slate-900 text-white text-sm">
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentProofs && paymentProofs.length > 0 ? (
                paymentProofs.map((element) => (
                  <tr key={element._id} className="hover:bg-gray-50 text-sm">
                    {/* User ID dynamically coming from backend */}
                    <td className="py-2 px-4 border-b font-mono text-xs">
                      {element.userId}
                    </td>
                    <td className="py-2 px-4 border-b">{element.status}</td>
                    <td className="py-2 px-4 border-b text-center space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                        onClick={() => handleFetchPaymentProofDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                        onClick={() => handlePaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-xl text-sky-600 py-5">
                    No payment proofs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Open Condition */}
      {openDrawer && <Drawer setOpenDrawer={setOpenDrawer} />}
    </>
  );
};

export default PaymentProofs;

// Drawer Component in the same file (Video Style)
export const Drawer = ({ setOpenDrawer }) => {
  const { singlePaymentProof, loading } = useSelector((state) => state.admin || {});
  const [amount, setAmount] = useState(singlePaymentProof?.amount || "");
  const [status, setStatus] = useState(singlePaymentProof?.status || "");
  const dispatch = useDispatch();

  const handlePaymentProofUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="text-lg font-bold">Update Payment Proof</h3>
            <button
              onClick={() => setOpenDrawer(false)}
              className="text-gray-500 hover:text-black font-bold text-xl"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-2 rounded mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2 rounded mt-1 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Settled">Settled</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                Payment Proof Screenshot
              </label>
              {singlePaymentProof?.proof?.url ? (
                <Link to={singlePaymentProof.proof.url} target="_blank">
                  <img
                    src={singlePaymentProof.proof.url}
                    alt="Proof"
                    className="w-full h-auto rounded border"
                  />
                </Link>
              ) : (
                <p className="text-xs text-gray-400">No Image Uploaded</p>
              )}
            </div>
          </form>
        </div>

        <div className="flex justify-end space-x-2 border-t pt-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700"
            onClick={handlePaymentProofUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-xs hover:bg-gray-400"
            onClick={() => setOpenDrawer(false)}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};
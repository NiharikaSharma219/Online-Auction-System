import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  
  // 🎯 Local tracking state: Proof submit hote hi banner update karne ke liye
  const [isSubmittedJustNow, setIsSubmittedJustNow] = useState(false);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  
  // Redux store se user & commission state
  const { user } = useSelector((state) => state.user || {});
  const { loading } = useSelector((state) => state.commission || {});

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);

    dispatch(postCommissionProof(formData));

    // Form clear karo aur state updated set karo
    setAmount("");
    setProof("");
    setComment("");
    setIsSubmittedJustNow(true);
  };

  // 💡 Check condition: Kya balance 0 hai OR Proof Pehle se submit hai OR Abhi Just Submit kiya hai
  const unpaidVal = Number(user?.unpaidCommission);
  const isPendingVerification =
    isSubmittedJustNow ||
    user?.isCommissionProofSubmitted ||
    unpaidVal === 0;

  return (
    <section className="w-full h-fit px-5 pt-10 lg:pl-[320px] flex flex-col min-h-screen py-8 bg-[#f4f6f9] text-slate-800">
      <div className="mx-auto w-full max-w-[800px] bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200 my-6">
        
        {/* Form Container */}
        <form onSubmit={handlePaymentProof} className="flex flex-col gap-6">
          <div className="text-center sm:text-left border-b border-slate-100 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Upload <span className="text-[#ff6b4a]">Payment Proof</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Please enter the amount paid and attach the transaction receipt.
            </p>
          </div>

          {/* 🎯 DYNAMIC COMMISSION STATUS BANNER */}
          {isPendingVerification ? (
            // 🟡 CASE 1: Proof Submitted & Waiting for Admin Approval (YELLOW CARD)
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    Verification Pending
                  </span>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Your payment proof has been submitted. We will review it and respond within 24 hours.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-amber-200 px-3 py-1.5 rounded-xl shadow-xs shrink-0">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                  Under Review
                </span>
              </div>
            </div>
          ) : (
            // 🔴 CASE 2: Unpaid Commission Exists (ORANGE CARD)
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-[#ff6b4a] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Pending Commission Balance
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear this amount to start posting new auctions.
                </p>
              </div>
              <div className="bg-white border border-red-200 px-4 py-2 rounded-xl shadow-sm">
                <span className="text-xl font-black text-[#ff6b4a]">
                  ₹{user?.unpaidCommission ?? 0}
                </span>
              </div>
            </div>
          )}

          {/* Amount Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Amount (₹)
            </label>
            <input
              type="number"
              placeholder={
                user?.unpaidCommission
                  ? `e.g. ${user.unpaidCommission}`
                  : "Enter paid amount"
              }
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all"
              required
            />
          </div>

          {/* Payment Proof File Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Payment Proof Screenshot
            </label>
            <input
              key={proof ? proof.name : "file-input"}
              type="file"
              onChange={proofHandler}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-600 focus:outline-none focus:border-[#ff6b4a] file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#ff6b4a]/10 file:text-[#ff6b4a] hover:file:bg-[#ff6b4a]/20 cursor-pointer transition-all"
              required
            />
          </div>

          {/* Comment Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Comment / Notes
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Add any details about this transaction (e.g. Txn ID)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-800 focus:outline-none focus:border-[#ff6b4a] focus:bg-white focus:ring-2 focus:ring-[#ff6b4a]/20 transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6b4a] hover:bg-[#e05333] active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 flex justify-center items-center cursor-pointer disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
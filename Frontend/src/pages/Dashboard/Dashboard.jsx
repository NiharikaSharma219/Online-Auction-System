import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyRevenue,
  getAllUsers,
  getAllPaymentProofs,
} from "../../store/slices/adminSlice";
import { getAllAuctionItems } from "../../store/slices/auctionSlice";

import AuctionDetails from "./sub-components/AuctionDetails";
import BiddersAuctioneerGraph from "./sub-components/BiddersAuctioneerGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import PaymentGraph from "./sub-components/PaymentGraph";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin || {});

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(getAllAuctionItems());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BiddersAuctioneerGraph />
        <PaymentGraph />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AuctionDetails />
        <PaymentProofs />
      </div>
    </div>
  );
};

export default Dashboard;
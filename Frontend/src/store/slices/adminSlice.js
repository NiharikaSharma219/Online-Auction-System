import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    // Monthly Revenue Actions
    requestForMonthlyRevenue(state) {
      state.loading = true;
    },
    
    successForMonthlyRevenue(state, action) {
        state.loading = false;
      state.monthlyRevenue = action.payload.totalMonthlyRevenue ||action.payload.monthlyRevenue || 
        action.payload.monthlyIncome || [];
      state.totalAuctioneers = action.payload.auctioneersArray || [];
      state.totalBidders = action.payload.biddersArray || [];
  
    },
    
      
    
    
    failedForMonthlyRevenue(state) {
      state.loading = false;
    },

    // Payment Proofs Actions
    requestForPaymentProofs(state) {
      state.loading = true;
    },
    successForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failedForPaymentProofs(state) {
      state.loading = false;
    },

    // Single Payment Proof Action
    requestForSinglePaymentProof(state) {
      state.loading = true;
    },
    successForSinglePaymentProof(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failedForSinglePaymentProof(state) {
      state.loading = false;
    },

    // Users Actions (FIXED: Set totalAuctioneers & totalBidders)
    requestForUsers(state) {
      state.loading = true;
    },
    successForUsers(state, action) {
  state.loading = false;
  // Backend se jo dynamic arrays aati hain:
  if (action.payload.auctioneersArray) {
    state.totalAuctioneers = action.payload.auctioneersArray;
  }
  if (action.payload.biddersArray) {
    state.totalBidders = action.payload.biddersArray;
  }
},
    failedForUsers(state) {
      state.loading = false;
    },

    // Clear Errors / Reset
    clearAllErrors(state) {
      state.loading = false;
    },
  },
});

const BASE_URL = "https://online-auction-system-wel2.onrender.com/api/v1/admin";

// 1. GET MONTHLY REVENUE & USER STATS (FIXED: Payload path)
export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForMonthlyRevenue());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/monthlyincome`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log("🔥 ACTUAL PAYLOAD FROM BACKEND:", response.data); // 👈 Is log ko dekhein
    // Extracting totalMonthlyRevenue array specifically!
    dispatch(
      adminSlice.actions.successForMonthlyRevenue(
        response.data
      )
    );
  } catch (error) {
    dispatch(adminSlice.actions.failedForMonthlyRevenue());
  }
};

// 2. GET ALL PAYMENT PROOFS
export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/paymentproofs/getall`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    dispatch(adminSlice.actions.successForPaymentProofs(response.data.paymentProofs));
  } catch (error) {
    dispatch(adminSlice.actions.failedForPaymentProofs());
  }
};

// 3. GET PAYMENT PROOF DETAILS
export const getPaymentProofDetail = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForSinglePaymentProof());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/paymentproof/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    dispatch(adminSlice.actions.successForSinglePaymentProof(response.data.paymentProof));
  } catch (error) {
    dispatch(adminSlice.actions.failedForSinglePaymentProof());
  }
};

// 4. UPDATE PAYMENT PROOF STATUS
export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/paymentproof/status/update/${id}`,
      { status, amount },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    toast.success(response.data.message || "Payment proof updated!");
    dispatch(getAllPaymentProofs());
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update payment proof");
    dispatch(adminSlice.actions.failedForPaymentProofs());
  }
};

// 5. DELETE PAYMENT PROOF
export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForPaymentProofs());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/paymentproof/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    toast.success(response.data.message || "Payment proof deleted!");
    dispatch(getAllPaymentProofs());
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete payment proof");
    dispatch(adminSlice.actions.failedForPaymentProofs());
  }
};

// 6. FETCH ALL FILTERED USERS (FIXED: Sending full response data object)
export const getAllUsers = () => async (dispatch) => {
  dispatch(adminSlice.actions.requestForUsers());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/users/getall`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    dispatch(adminSlice.actions.successForUsers(response.data));
  } catch (error) {
    dispatch(adminSlice.actions.failedForUsers());
  }
};

// 7. DELETE AUCTION ITEM (BY ADMIN)
export const deleteAuctionItemByAdmin = (id) => async (dispatch) => {
  dispatch(adminSlice.actions.requestForMonthlyRevenue());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/auctionitem/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    toast.success(response.data.message || "Auction item deleted successfully!");
    dispatch(getAllAuctionItems());
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete auction item");
    dispatch(adminSlice.actions.failedForMonthlyRevenue());
  }
};

export default adminSlice.reducer;
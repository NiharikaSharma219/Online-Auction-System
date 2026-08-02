import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail:{},
    allAuctions: [],
    auctionDetail: {},
    myAuctions: [],
    auctionBidders: [],
  },
  reducers: {

    createAuctionRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    createAuctionSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    createAuctionFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllErrors(state,action){
      state.error=null;
    },
    // GET ALL AUCTIONS REQUESTS
    getAllAuctionItemRequest(state) {
      state.loading = true;
      state.allAuctions = [];
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state) {
      state.loading = false;
      state.allAuctions = [];
    },

    getMyAuctionItemRequest(state) {
      state.loading = true;
      state.myAuctions = [];
    },
    getMyAuctionItemSuccess(state, action) {
      state.loading = false;
      state.myAuctions = action.payload;
    },
    getMyAuctionItemFailed(state) {
      state.loading = false;
      state.myAuctions = [];
    },

    // GET AUCTION DETAILS REQUESTS
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload;
      state.auctionBidders= 
        action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
    },

    // RESET SLICE STATE
    resetSlice(state) {
      state.loading = false;
      state.auctionDetail = {};
    },
  },
});

export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());
  try {
    const response = await axios.post(
      "https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/create", // Apne backend port/route ke hisab se URL match kar lijiye
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(auctionSlice.actions.createAuctionSuccess());
    toast.success(response.data.message || "Auction Created Successfully!");
    dispatch(getAllAuctionItems()); // List refresh karne ke liye
  } catch (error) {
    dispatch(
      auctionSlice.actions.createAuctionFailed(
        error.response?.data?.message || "Failed to create auction"
      )
    );
  }
};
// Async Action to Fetch All Auctions from Backend
export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(
      "https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/allItems",
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    console.error("Error fetching auction items:", error);
  }
};

// Logged-in user ke apne auctions fetch karne ke liye
export const getMyAuctions = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionItemRequest());
  try {
    const response = await axios.get(
      "https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/myItems", // 👈 /myitems route
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getMyAuctionItemSuccess(
        response.data.myAuctions || response.data.items || response.data.auctionItems
      )
    );
  } catch (error) {
    dispatch(auctionSlice.actions.getMyAuctionItemFailed());
    console.error("Error fetching my auctions:", error);
  }
};

// Add this exported action at the bottom of auctionSlice.js
export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());
  try {
    const response = await axios.get(
      `https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/auction/${id}`,
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getAuctionDetailSuccess(response.data.auctionItem)
    );
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailFailed());
    console.error("Error fetching auction detail:", error);
  }
};

// DELETE AUCTION ACTION
export const deleteAuction = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/delete/${id}`,
      { withCredentials: true }
    );
    toast.success(response.data.message || "Auction deleted successfully!");
    dispatch(getMyAuctions()); // List refresh karne ke liye
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete auction");
  }
};

// REPUBLISH AUCTION ACTION
export const republishAuction = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://online-auction-system-wel2.onrender.com/api/v1/auctionitem/item/republish/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    toast.success(response.data.message || "Auction republished successfully!");
    dispatch(getMyAuctions()); // List refresh karne ke liye
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to republish auction");
  }
};

export const clearAllAuctionErrors = () => (dispatch) => {
  dispatch(auctionSlice.actions.clearAllErrors());
};

export const { resetSlice } = auctionSlice.actions;
export default auctionSlice.reducer;
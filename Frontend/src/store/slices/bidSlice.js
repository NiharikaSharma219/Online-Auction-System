import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
  },
  reducers: {
    placeBidRequest(state) {
      state.loading = true;
    },
    placeBidSuccess(state) {
      state.loading = false;
    },
    placeBidFailed(state) {
      state.loading = false;
    },
  },
});

export const placeBid = (id, data) => async (dispatch) => {
  dispatch(bidSlice.actions.placeBidRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/bid/place/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(bidSlice.actions.placeBidSuccess());
    toast.success(response.data.message || "Bid placed successfully!");
  } catch (error) {
    dispatch(bidSlice.actions.placeBidFailed());
    toast.error(
      error.response?.data?.message || "Failed to place bid. Try again!"
    );
  }
};

export default bidSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import auctionReducer from "./slices/auctionSlice";
import commissionReducer from "./slices/commissionSlice";
import bidReducer from "./slices/bidSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    bid: bidReducer,
    commission: commissionReducer,
    admin: adminReducer,
  },
});
   
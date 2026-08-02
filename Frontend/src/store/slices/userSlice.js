import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },

    getUserRequest(state) {
      state.loading = true;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    // userSlice.js ke reducers mein:
getUserFailed(state, action) {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = {};
  // Clear error if it's unauthenticated
  if (action.payload === "User not authenticated.") {
    state.error = null;
  } else {
    state.error = action.payload;
  }
},
logoutSuccess(state, action) {
  state.loading = false;
  state.isAuthenticated = false;
  state.user = {};
  state.error = null;
},
    logoutFailed(state) {
      state.loading = false;
    },

    fetchLeaderboardRequest(state,action){
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderboardSuccess(state,action){
      state.loading =false;
      state.leaderboard =action.payload;
    },
    fetchLeaderboardFailed(state,action){
      state.loading =false;
      state.leaderboard = [];
    },

    clearAllErrors(state) {
      state.loading = false;
    },
  },
});

// 1. REGISTER ACTION
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "https://online-auction-system-wel2.onrender.com/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response?.data?.message || "Registration failed");
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "https://online-auction-system-wel2.onrender.com/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Login failed");
  }
};

// 2. GET USER ACTION (FIX HERE 🎯)
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.getUserRequest());
  try {
    const response = await axios.get("https://online-auction-system-wel2.onrender.com/api/v1/user/profile", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.getUserFailed());

    const status = error.response?.status;
    const message = error.response?.data?.message;

    // 💡 FIX: Agar status 400 ya 401 hai (unauthenticated user), toh toast MAT dikhao!
    if (status !== 400 && status !== 401 && message) {
      toast.error(message);
    }
  }
};

// 3. LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://online-auction-system-wel2.onrender.com/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "https://online-auction-system-wel2.onrender.com/api/v1/user/profile",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    console.error(error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      "https://online-auction-system-wel2.onrender.com/api/v1/user/leaderboard",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard));
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());
    console.error(error);
  }
};

export default userSlice.reducer;
// src/redux/userRedux.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

/* ────────────────────────────────
   THUNKS
   ────────────────────────────────*/
export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const { data } = await publicRequest.post("/auth/register", user);
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ?? err.message ?? "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await publicRequest.post("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ?? err.message ?? "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* ────────────────────────────────
   INITIAL STATE
   ────────────────────────────────*/
const initialState = {
  currentUser: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

/* ────────────────────────────────
   SLICE
   ────────────────────────────────*/
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    signOut: (state) => {
      Object.assign(state, initialState); // quick reset
    },
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },

  /* 🆕 builder-callback notation */
  extraReducers: (builder) => {
    /* REGISTER */
    builder
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      /* SIGN-IN */
      .addCase(signIn.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearState, loginStart, loginSuccess, loginFailure, signOut } =
  userSlice.actions;

export const userSelector = (state) => state.user;
export default userSlice.reducer;

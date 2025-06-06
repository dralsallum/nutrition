import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

const initialState = {
  currentUser: null,
  isFetch: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await publicRequest.post("auth/register", user);
      return response.data;
    } catch (error) {
      let message;
      if (error.response && error.response.data.message) {
        message = error.response.data.message;
      } else {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

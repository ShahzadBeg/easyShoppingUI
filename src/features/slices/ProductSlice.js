import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://localhost:7169/api/getproducts"
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "pending";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;

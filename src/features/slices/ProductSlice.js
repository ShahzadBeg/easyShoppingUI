import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../api";

const initialState = {
  items: [],
  status: null,
  error: null,
  tags: [],
  categories: [],
  createStatus: "",
  createmsg: "",
};

export const getTags = createAsyncThunk(
  "products/getTags",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getTags`);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const testCreateProd = createAsyncThunk(
  "products/testCreateProd",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/testCreateProduct`, values);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getproducts`);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getCategories`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
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
    [getTags.pending]: (state, action) => {
      state.status = "pending";
    },
    [getTags.fulfilled]: (state, action) => {
      state.status = "success";
      state.tags = action.payload;
    },
    [getTags.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [getCategories.pending]: (state, action) => {
      state.status = "pending";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.status = "success";
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.status = "pending";
      state.error = action.payload;
    },
    [testCreateProd.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [testCreateProd.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.categories = action.payload;
    },
    [testCreateProd.rejected]: (state, action) => {
      state.createStatus = "rejected";
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;

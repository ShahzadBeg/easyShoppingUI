import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config, formDataConfig } from "../api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  error: null,
  tags: [],
  tagStatus: "",
  tagError: "",
  categories: [],
  catogoryStatus: "",
  categoryError: "",
  createProductMsg: "",
  createProductStatus: "",
  createProductError: "",
  createTag: {},
  createTagStatus: "",
  createTagError: "",
  createCategory: {},
  createCatgStatus: "",
  createCatgError: "",
};

export const getTags = createAsyncThunk(
  "products/getTags",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getTags`, config);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getCategories`, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
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

export const createTag = createAsyncThunk(
  "products/createTag",
  async (values, { rejectWithValue }) => {
    try {
      const respose = await axios.post(`${baseUrl}/createtag`, values, config);
      if (respose?.data?.isExist) {
        toast.info(respose.data.message[0], { position: "bottom-left" });
      } else {
        toast.success(respose.data.message[0], { position: "bottom-left" });
      }

      return respose?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createCategpry = createAsyncThunk(
  "products/createCategpry",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/createCategory`,
        values,
        config
      );
      if (response?.data?.isExist) {
        toast.info(response.data.message[0], { position: "bottom-left" });
      } else {
        toast.success(response.data.message[0], { position: "bottom-left" });
      }
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (values, { rejectWithValue }) => {
    try {
      const response = axios.post(
        `${baseUrl}/createProduct`,
        values,
        formDataConfig
      );
      return response?.data;
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
      state.tagStatus = "pending";
    },
    [getTags.fulfilled]: (state, action) => {
      state.tagStatus = "success";
      state.tags = action.payload;
    },
    [getTags.rejected]: (state, action) => {
      state.tagStatus = "error";
      state.tagError = action.payload;
    },
    [getCategories.pending]: (state, action) => {
      state.catogoryStatus = "pending";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.catogoryStatus = "success";
      state.categories = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.catogoryStatus = "pending";
      state.categoryError = action.payload;
    },
    [createProduct.pending]: (state, action) => {
      state.createProductStatus = "pending";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createProductStatus = "success";
      state.createProductMsg = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.createProductMsg = action.payload;
      state.createProductError = action.payload;
    },
    [createTag.pending]: (state, action) => {
      state.createTagStatus = "pending";
    },
    [createTag.fulfilled]: (state, action) => {
      state.createTagStatus = "success";
      state.createTag = action.payload;
    },
    [createTag.rejected]: (state, action) => {
      state.createTagStatus = "error";
      state.createTagError = action.payload;
    },
    [createCategpry.pending]: (state, action) => {
      state.createCatgStatus = "pending";
    },
    [createCategpry.fulfilled]: (state, action) => {
      state.createCatgStatus = "success";
      state.createCategory = action.payload;
    },
    [createCategpry.rejected]: (state, action) => {
      state.createCatgStatus = "error";
      state.createCatgError = action.payload;
    },
  },
});

export default productSlice.reducer;

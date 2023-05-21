import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config, formDataConfig } from "../api";
import { toast } from "react-toastify";

const initialState = {
  item: {},
  loading: false,
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
  deleteProductStatus: "",
  deleteProductError: "",
  deleteProductMsg: "",
  editProduct: null,
  editProductLoading: false,
  editproductError: "",
  updatedProduct: {},
  updateProductLoad: false,
  updateProductError: "",
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
export const getProductbyId = createAsyncThunk(
  "products/getProductbyId",
  async (values, { rejectWithValue }) => {
    try {
      var response = await axios.get(
        `${baseUrl}/getProductbyIdAsync?id=${values}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/deleteProduct?Id=${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
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
      const response = await axios.post(
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
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (values, { rejectWithValue }) => {
    console.log("values", { ...values });

    try {
      const response = await axios.put(
        `${baseUrl}/updateProduct/${8}`,
        values,
        formDataConfig
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
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
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.item = action.payload;
      state.loading = false;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.loading = false;
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
      const newProduct = {
        description: action.payload.description,
        id: action.payload.id,
        images: action.payload.images,
        name: action.payload.name,
        price: action.payload.price,
      };
      state.item.products.push(newProduct);
    },
    [createProduct.rejected]: (state, action) => {
      state.createProductStatus = "error";
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

    [deleteProduct.pending]: (state, action) => {
      state.deleteProductStatus = "pending";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const newProdList = state.item.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.item.products = newProdList;
      state.deleteProductStatus = "success";
      state.deleteProductMsg = action.payload;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.deleteProductStatus = "error";
      state.deleteProductError = action.payload;
    },
    [getProductbyId.pending]: (state, action) => {
      state.editProductLoading = true;
    },
    [getProductbyId.fulfilled]: (state, action) => {
      state.editProductLoading = false;
      state.editProduct = action.payload;
    },
    [getProductbyId.rejected]: (state, action) => {
      state.editProductLoading = false;
      state.editproductError = action.payload;
    },

    [updateProduct.pending]: (state, action) => {
      state.updateProductLoad = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.updateProductLoad = false;
      state.updateProduct = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.updateProductLoad = false;
      state.updateProductError = action.payload;
    },
  },
});

export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "../api";
import { toast } from "react-toastify";

const initialState = {
  countries: [],
  states: [],
  cities: [],
  createAddress: {},
  createAddressLoading: false,
  countryLoading: false,
  stateLoading: false,
  cityLoading: false,
  error: {},
};

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/createAddress`,
        values,
        config
      );
      toast.success("Address added suucessfully", { position: "bottom-left" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.respone?.data);
    }
  }
);

export const getCities = createAsyncThunk(
  "address/getCities",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/getcities?stateId=${value}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.respone?.data);
    }
  }
);

export const getallCountries = createAsyncThunk(
  "address/getallCountries",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/getcountries`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.respone?.data);
    }
  }
);

export const getStates = createAsyncThunk(
  "address/getStates",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/getstates?countryId=${value}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: {
    [getallCountries.pending]: (state, action) => {
      state.countryLoading = true;
    },
    [getallCountries.fulfilled]: (state, action) => {
      state.countryLoading = false;
      state.countries = action.payload.countryList;
    },
    [getallCountries.rejected]: (state, action) => {
      state.countryLoading = false;
      state.error = action.payload;
    },
    [getStates.pending]: (state, action) => {
      state.stateLoading = true;
    },
    [getStates.fulfilled]: (state, action) => {
      state.stateLoading = false;
      state.states = action.payload.statesList;
    },
    [getStates.rejected]: (state, action) => {
      state.stateLoading = false;
      state.error = action.payload.message;
    },
    [getCities.pending]: (state, action) => {
      state.cityLoading = true;
    },
    [getCities.fulfilled]: (state, action) => {
      state.cityLoading = false;
      state.cities = action.payload.cityList;
    },
    [getCities.rejected]: (state, action) => {
      state.cityLoading = false;
      state.error = action.payload.message;
    },
    [createAddress.pending]: (state, action) => {
      state.createAddressLoading = true;
    },
    [createAddress.fulfilled]: (state, action) => {
      state.createAddressLoading = false;
      state.createAddress = action.payload;
    },
    [createAddress.rejected]: (state, action) => {
      state.createAddressLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default AddressSlice.reducer;

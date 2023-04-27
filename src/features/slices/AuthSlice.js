import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, roleUri } from "../api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const initialState = {
  token: "",
  loginUser: JSON.parse(localStorage.getItem("user")),
  accessToken: "",
  name: "",
  email: "",
  _Id: "",
  role: [],
  _password: "",
  registerStatus: "",
  registerMsg: "",
  loginStatus: "",
  loginError: "",
  IsLoggedIn: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      var response = await axios.post(`${baseUrl}/auth/register`, values);
      if (response?.data?.success) {
        toast.success(`${response?.data?.message[0]}`, {
          position: "bottom-left",
        });
      } else {
        toast.info(`${response?.data?.message[0]}`, {
          position: "bottom-left",
        });
      }
      return response?.data;
    } catch (err) {
      console.log("error", err?.response?.data?.errors);
      toast.error(`${err?.response?.data.title}`, { position: "bottom-left" });
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values);
      return response?.data;
    } catch (err) {
      console.log("error", err?.response?.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fillUserData(state, action) {
      console.log("called data");
      if (state.loginUser) {
        console.log("inside");
        localStorage.setItem("user", JSON.stringify(state.loginUser));
        state.token = state.loginUser.token;
        state.accessToken = state.loginUser.accessToken;
        state.name = state.loginUser.name;
        state.email = state.loginUser.email;
        state._Id = state.loginUser.userId;
        state.role = state.loginUser.role;
      }
    },
    fillLoginData(state, action) {
      if ((state.registerStatus = "success")) {
        state.email = action.payload.email;
        state._password = action.payload.password;
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.registerStatus = "pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      state.registerStatus = "success";
      state.registerMsg = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.registerStatus = "error";
      state.registerMsg = action.payload;
    },
    [login.pending]: (state, action) => {
      state.loginStatus = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.loginStatus = "success";
      state.loginUser = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      state.loginError = action.payload;
    },
  },
});

export const { fillUserData, fillLoginData } = authSlice.actions;
export default authSlice.reducer;

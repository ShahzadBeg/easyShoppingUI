import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../api";
import { toast } from "react-toastify";

const initialState = {
  token: "",
  loginUser: JSON.parse(localStorage.getItem("user")),
  accessToken: "",
  name: "",
  email: "",
  _Id: "",
  roles: [],
  IsAdmin: false,
  _password: localStorage.getItem("password"),
  registerStatus: "",
  registerMsg: "",
  loginStatus: "",
  loginError: "",
  IsLoggedIn: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      var response = await axios.post(`${baseUrl}/auth/register`, { ...user });
      if (response?.data?.success) {
        toast.success(`${response?.data?.message[0]}`, {
          position: "bottom-left",
        });
        const values = { ...user };
        const _password = values.password;
        localStorage.setItem("password", _password);
        navigate("/login");
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
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { ...user });
      localStorage.setItem("user", JSON.stringify(response?.data));
      localStorage.removeItem("password");
      navigate("/");
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
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.token = user.token;
        state.accessToken = user.accessToken;
        state.name = user.name;
        state.email = user.email;
        state._Id = user.userId;
        state.roles = user.roles;
        if (user.roles.length > 0) {
          state.IsAdmin =
            user.roles.indexOf("Admin") > -1 ||
            user.roles.indexOf("SuperAdmin") > -1;
        }
      }
    },
    fillLoginData(state, action) {
      if ((state.registerStatus = "success")) {
        state.email = action.payload.email;
        state._password = action.payload.password;
      }
    },
    logoutUser(state, action) {
      if (state.loginUser) {
        localStorage.removeItem("user");
        return {
          ...state,
          token: "",
          loginUser: "",
          accessToken: "",
          name: "",
          email: "",
          _Id: "",
          role: [],
        };
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
      state.token = action.payload.token;
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state._Id = action.payload.userId;
      state.roles = action.payload.roles;
      if (state.roles.length > 0) {
        state.IsAdmin =
          action.payload.roles.indexOf("Admin") > -1 ||
          action.payload.roles.indexOf("SuperAdmin") > -1;
      }
    },
    [login.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      state.loginError = action.payload;
    },
  },
});

export const { fillUserData, fillLoginData, logoutUser } = authSlice.actions;
export default authSlice.reducer;

import React from "react";
import { StyledForm } from "./StyledForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/slices/AuthSlice";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, _password } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    userName: email ?? "",
    password: _password ?? "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ user, navigate }));
  };
  return (
    <StyledForm onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button>Login</button>
    </StyledForm>
  );
};

export default Login;

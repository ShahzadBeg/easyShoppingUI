export const baseUrl = "https://localhost:7169/api";

const getToken = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user.token;
  } else {
    return null;
  }
};

export let config = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    Authorization: `Bearer ${getToken()}`,
  },
};

export const formDataConfig = {
  headers: {
    accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Credentials": "true",
    Authorization: `Bearer ${getToken()}`,
  },
};

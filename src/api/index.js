import axios from "axios";
import router from "../router";

const DOMAIN = "https://localhost:4001";
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push("/login");
};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) {
        return onUnauthorized();
      }

      // throw Error(result);
      throw result.response;
    });
};

export const auth = {
  login(username, password) {
    return request("POST", "/api/users/authenticate", {
      username,
      password,
    });
  },
};

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};

// const { token } = localStorage;
// if (token) {
//   setAuthInHeader(token);
// }

export const category = {
  fetch(id) {
    return id
      ? request("GET", `/api/category/${id}`)
      : request("GET", "/api/category");
  },
  create(name) {
    return request("POST", "/api/category", {
      name,
      bgColor: "rgb(0, 121, 191)",
      userId: 1,
    });
  },
};

export const todoItem = {
  create(name, flowId, pos) {
    return request("POST", "/api/todoitems", { name, flowId, pos });
  },
};

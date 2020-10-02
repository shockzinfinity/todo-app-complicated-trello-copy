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

export const setAuthInHeader = (token) => {
  axios.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : null;
};

export const category = {
  fetch() {
    return request("GET", "/api/category");
  },
};

export const auth = {
  login(username, password) {
    return request("POST", "/api/users/authenticate", {
      username,
      password,
    });
  },
};

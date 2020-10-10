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
    data
  })
    .then(result => result.data)
    .catch(result => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) {
        return onUnauthorized();
      }

      // throw Error(result);
      throw result.response;
    });
};
const patchRequest = (url, data) => {
  return axios
    .patch(DOMAIN + url, data)
    .then(result => result.data)
    .catch(result => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) {
        return onUnauthorized();
      }

      throw result.response;
    });
};

export const auth = {
  login(username, password) {
    return request("POST", "/api/users/authenticate", {
      username,
      password
    });
  }
};

export const setAuthInHeader = token => {
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
      userId: 1
    });
  }
};

export const todoItem = {
  create(name, flowId, pos) {
    return request("POST", "/api/todoitems", { name, flowId, pos });
  },
  fetch(id) {
    // console.log("api id: ", id);
    return request("GET", `/api/todoitems/${id}`);
  },
  update(id, payload) {
    return request("PUT", `/api/todoitems/${id}`, payload);
  },
  patch(id, payload) {
    const thePatch = [];
    if (payload.name) {
      thePatch.push({
        op: "replace",
        path: "/name",
        value: `${payload.name}`
      });
    }
    if (payload.description) {
      thePatch.push({
        op: "replace",
        path: "/description",
        value: `${payload.description}`
      });
    }
    if (payload.pos) {
      thePatch.push({
        op: "replace",
        path: "/pos",
        value: `${payload.pos}`
      });
    }
    if (payload.flowId) {
      thePatch.push({
        op: "replace",
        path: "/flowId",
        value: `${payload.flowId}`
      });
    }
    return patchRequest(`/api/todoitems/${id}`, thePatch);
  },
  destory(id) {
    return request("DELETE", `/api/todoitems/${id}`);
  }
};

import * as api from "../api";

const actions = {
  ADD_CATEGORY(_, { name }) {
    return api.category.create(name).then((data) => data);
  },
  FETCH_CATEGORIES({ commit }) {
    return api.category.fetch().then((data) => {
      commit("SET_CATEGORIES", data);
    });
  },
  FETCH_CATEGORY({ commit }, { id }) {
    return api.category.fetch(id).then((data) => {
      commit("SET_CATEGORY", data);
    });
  },
  LOGIN({ commit }, { username, password }) {
    return api.auth
      .login(username, password)
      .then(({ token }) => commit("LOGIN", token));
  },
};

export default actions;

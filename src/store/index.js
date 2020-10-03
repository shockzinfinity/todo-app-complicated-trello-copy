import Vue from "vue";
import Vuex from "vuex";
import * as api from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddCategory: false,
    categories: [],
    token: null,
  },
  getters: {
    isAuth(state) {
      return !!state.token;
    },
  },
  mutations: {
    SET_IS_ADD_CATEGORY(state, toggle) {
      state.isAddCategory = toggle;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    LOGIN(state, token) {
      if (!token) {
        return;
      }

      state.token = token;
      localStorage.setItem("token", token);
      api.setAuthInHeader(token);
    },
    LOGOUT(state) {
      state.token = null;
      delete localStorage.token;
      api.setAuthInHeader(null);
    },
  },
  actions: {
    ADD_CATEGORY(_, { name }) {
      return api.category.create(name);
    },
    FETCH_CATEGORIES({ commit }) {
      return api.category.fetch().then((data) => {
        commit("SET_CATEGORIES", data);
      });
    },
    LOGIN({ commit }, { username, password }) {
      return api.auth
        .login(username, password)
        .then(({ token }) => commit("LOGIN", token));
    },
  },
});

const { token } = localStorage;
store.commit("LOGIN", token);

export default store;

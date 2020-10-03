import Vue from "vue";
import Vuex from "vuex";
import * as api from "../api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddCategory: false,
    categories: [],
  },
  mutations: {
    SET_IS_ADD_CATEGORY(state, toggle) {
      state.isAddCategory = toggle;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    ADD_CATEGORY(_, { name }) {
      return api.category.create(name);
    },
    FETCH_CATEGORIES({ commit }) {
      return api.category.fetch().then((data) => {
        console.log(data);
        commit("SET_CATEGORIES", data);
      });
    },
  },
});

export default store;

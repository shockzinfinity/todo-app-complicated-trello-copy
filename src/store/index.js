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
  },
  actions: {
    ADD_CATEGORY(_, { name }) {
      return api.category.create(name);
    },
  },
});

export default store;

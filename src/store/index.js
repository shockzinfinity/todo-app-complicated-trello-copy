import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAddCategory: false,
  },
  mutations: {
    SET_IS_ADD_CATEGORY(state, toggle) {
      state.isAddCategory = toggle;
    },
  },
});

export default store;

import { setAuthInHeader } from "../api";

const mutations = {
  SET_IS_ADD_CATEGORY(state, toggle) {
    state.isAddCategory = toggle;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  SET_TODOITEM(state, todoItem) {
    state.todoItem = todoItem;
  },
  LOGIN(state, token) {
    if (!token) {
      return;
    }

    state.token = token;
    localStorage.setItem("token", token);
    setAuthInHeader(token);
  },
  LOGOUT(state) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(null);
  },
};

export default mutations;

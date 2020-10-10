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
  SET_THEME(state, color) {
    state.bodyColor = color || "#ffffff";
    state.navbarColor = color ? "rgba(0,0,0,.15)" : "#026aa7";
  },
  SET_IS_SHOW_CATEGORY_SETTINGS(state, toggle) {
    state.isShowCategorySettings = toggle;
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
  }
};

export default mutations;

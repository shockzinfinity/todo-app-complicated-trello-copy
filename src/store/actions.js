import * as api from "../api";
import state from "./state";

const actions = {
  ADD_CATEGORY(_, { name }) {
    return api.category.create(name).then(data => data);
  },
  FETCH_CATEGORIES({ commit }) {
    return api.category.fetch().then(data => {
      commit("SET_CATEGORIES", data);
    });
  },
  FETCH_CATEGORY({ commit }, { id }) {
    return api.category.fetch(id).then(data => {
      commit("SET_CATEGORY", data);
    });
  },
  DELETE_CATEGORY(_, { id }) {
    return api.category.destory(id);
  },
  UPDATE_CATEGORY({ dispatch, state }, { id, name, bgColor }) {
    return api.category
      .update(id, { id, name, bgColor })
      .then(() => dispatch("FETCH_CATEGORY", { id: state.category.id }));
  },
  LOGIN({ commit }, { username, password }) {
    return api.auth
      .login(username, password)
      .then(({ token }) => commit("LOGIN", token));
  },
  ADD_TODOITEM({ dispatch, state }, { name, flowId, pos }) {
    return api.todoItem
      .create(name, flowId, pos)
      .then(() => dispatch("FETCH_CATEGORY", { id: state.category.id }));
  },
  FETCH_TODOITEM({ commit }, { id }) {
    // console.log("actions id: ", id);
    return api.todoItem.fetch(id).then(data => {
      commit("SET_TODOITEM", data);
    });
  },
  UPDATE_TODOITEM({ dispatch, state }, { id, name, description, pos, flowId }) {
    const payload = state.todoItem;

    if (name) {
      payload.name = name;
    }

    if (description) {
      payload.description = description;
    }

    if (pos) {
      payload.pos = pos;
    }

    if (flowId) {
      payload.flowId = flowId;
    }

    payload.id = id;

    console.log("actions id: ", id);
    console.log("actions payload: ", payload);

    return api.todoItem
      .update(id, payload)
      .then(() => dispatch("FETCH_CATEGORY", { id: state.category.id }));
  },
  PATCH_TODOITEM({ dispatch, state }, { id, name, description, pos, flowId }) {
    return api.todoItem
      .patch(id, { id, name, description, pos, flowId })
      .then(() => dispatch("FETCH_CATEGORY", { id: state.category.id }));
  },
  DELETE_TODOITEM({ dispatch, state }, { id }) {
    return api.todoItem
      .destory(id)
      .then(() => dispatch("FETCH_CATEGORY", { id: state.category.id }));
  }
};

export default actions;

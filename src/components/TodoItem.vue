<template lang="pug">
.todo-item(:data-todo-id="data.id", :data-todo-pos="data.pos")
  router-link(:to="`/c/${categoryId}/t/${data.id}`")
    div {{ data.name }}
    .todo-item-meta(v-if="data.description") &equiv;
  a.delete-todo-btn(href="", @click.prevent="onDelete") &times;
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    data: { type: Object }
  },
  computed: {
    ...mapState({
      categoryId: state => state.category.id
    })
  },
  methods: {
    ...mapActions(["DELETE_TODOITEM"]),
    onDelete() {
      if (!window.confirm("Delete this todo item?")) {
        return;
      }
      this.DELETE_TODOITEM({ id: this.data.id });
    }
  }
};
</script>

<style>
.todo-item {
  background-color: #ffffff;
  border-radius: 3px;
  margin: 8px;
  padding: 6px 20px 2px 8px;
  box-shadow: 0 1px 0 #cccccc;
  position: relative;
}

.todo-item a {
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: block;
}

.todo-item:hover,
.todo-item:focus {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.todo-item-meta {
  font-size: 26px;
  padding: 5px 0 0 3px;
  color: #8c8c8c;
}

.delete-todo-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaaaaa;
}
</style>

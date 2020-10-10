<template lang="pug">
.list(
  :data-flow-id="data.id",
  :data-flow-pos="data.pos",
  :data-flow-name="data.name"
)
  .list-header
    input.form-control.input-title(
      type="text",
      v-if="isEditTitle",
      ref="inputTitle",
      v-model="inputTitle",
      @blur="onBlurTitle",
      @keypress.enter="onSubmitTitle"
    )
    .list-header-title(v-else, @click.prevent="onClickTitle") {{ data.name }}
    a.delete-list-btn(href="", @click.prevent="onDeleteFlow") &times;
  .todo-list
    todo-item(v-for="todo in data.items", :key="todo.id", :data="todo")
  div(v-if="isAddItem")
    add-item(:flowId="data.id", @close="isAddItem = false")
  div(v-else)
    a.add-todo-btn(href="", @click.prevent="isAddItem = true") &plus; Add a item...
</template>

<script>
import AddItem from "@/components/AddItem";
import TodoItem from "@/components/TodoItem";
import { mapActions, mapState } from "vuex";
import { category } from "../api";

export default {
  components: {
    AddItem,
    TodoItem
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isAddItem: false,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  methods: {
    ...mapActions(["UPDATE_FLOW", "DELETE_FLOW"]),
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    onBlurTitle() {
      this.isEditTitle = false;
    },
    onSubmitTitle() {
      this.onBlurTitle();
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return;
      }

      const id = this.data.id;
      const name = this.inputTitle;
      const pos = this.data.pos;
      const categoryId = this.data.categoryId;
      if (name === this.data.name) {
        return;
      }

      // console.log(id, name, pos, categoryId);
      this.UPDATE_FLOW({ id, name, pos, categoryId });
    },
    onDeleteFlow() {
      if (!window.confirm(`Delete ${this.data.name} flow?`)) {
        return;
      }
      this.DELETE_FLOW({ id: this.data.id });
    }
  },
  created() {
    this.inputTitle = this.data.name;
  }
};
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}

.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}

.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}

.input-title {
  width: 90%;
}

.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaaaaa;
  font-size: 24px;
}

.todo-list {
  flex: 1 1 auto;
  /* overflow-y: scroll; */
}

.empty-todo-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}

.add-todo-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}

.add-todo-btn:focus,
.add-todo-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>

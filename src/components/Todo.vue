<template lang="pug">
modal.modal-todo
  .modal-todo-header(slot="header")
    .modal-todo-header-title
      input.form-control(
        type="text",
        :value="todoItem.name",
        :readonly="!toggleTitle",
        @click="toggleTitle = true",
        @blur="onBlurTitle",
        ref="inputTitle"
      )
      a.modal-close-btn(href="", @click.prevent="onClose") &times;
  div(slot="body")
    h3 Description
    textarea.form-control(
      cols="30",
      rows="3",
      placeholder="Add a more detailed description...",
      :readonly="!toggleDesc",
      v-model="todoItem.description",
      @click="toggleDesc = true",
      @blur="onBlurDesc",
      ref="inputDesc"
    )
  div(slot="footer")
</template>

<script>
import Modal from "@/components/Modal";
import { mapActions, mapState } from "vuex";

export default {
  name: "Todo",
  components: {
    Modal
  },
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    };
  },
  computed: {
    ...mapState({
      todoItem: "todoItem",
      category: "category"
    })
  },
  methods: {
    ...mapActions({
      FETCH_TODOITEM: "FETCH_TODOITEM",
      UPDATE_TODOITEM: "UPDATE_TODOITEM"
    }),
    onClose() {
      this.$router.push(`/c/${this.category.id}`);
    },
    fetchTodoItem() {
      const id = this.$route.params.tid;
      this.FETCH_TODOITEM({ id });
    },
    onBlurTitle() {
      this.toggleTitle = false;
      const title = this.$refs.inputTitle.value.trim();
      if (!title) {
        return;
      }

      this.UPDATE_TODOITEM({ id: this.todoItem.id, name: title }).then(() => {
        this.fetchTodoItem();
      });
    },
    onBlurDesc() {
      this.toggleDesc = false;
      const desc = this.$refs.inputDesc.value.trim();
      if (!desc) {
        return;
      }

      this.UPDATE_TODOITEM({ id: this.todoItem.id, description: desc }).then(
        () => {
          this.fetchTodoItem();
        }
      );
    }
  },
  created() {
    this.fetchTodoItem();
  }
};
</script>

<style>
.modal-todo .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}

.modal-todo-header-title {
  padding-right: 30px;
}

.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}

.modal-todo-header {
  position: relative;
}
</style>

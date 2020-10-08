<template lang="pug">
modal.modal-todo
  .modal-todo-header(slot="header")
    .modal-todo-header-title
      input.form-control(
        type="text",
        :value="todoItem.name",
        :readonly="!toggleTitle",
        @click="toggleTitle = true",
        @blur="toggleTitle = false"
      )
      a.modal-close-btn(href="", @click.prevent="onClose") &times;
  div(slot="body")
    h3 Description
    textarea.form-control(
      cols="30",
      rows="3",
      placeholder="Add a more detailed description...",
      readonly,
      v-model="todoItem.description"
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
      toggleTitle: false
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
      FETCH_TODOITEM: "FETCH_TODOITEM"
    }),
    onClose() {
      this.$router.push(`/c/${this.category.id}`);
    }
  },
  created() {
    const id = this.$route.params.tid;
    // console.log("component id: ", id);
    this.FETCH_TODOITEM({ id });
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

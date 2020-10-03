<template lang="pug">
modal
  div(slot="header")
    h2 Create new category
      a.modal-default-button(href="", @click.prevent="close") &times;
  div(slot="body")
    form#add-category-form(@submit.prevent="addCategory")
      input.form-control(type="text", v-model="input", ref="input")
  div(slot="footer")
    button.btn(
      :class="{ 'btn-success': valid }",
      type="submit",
      form="add-category-form",
      :disable="!valid"
    ) Create Category
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: { Modal },
  data() {
    return {
      input: "",
      valid: false
    };
  },
  watch: {
    input(v) {
      this.valid = v.trim().length > 0;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addCategory() {
      this.$emit("close");
      this.$emit("submit", this.input);
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>
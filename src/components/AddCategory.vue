<template lang="pug">
modal
  div(slot="header")
    h2 Create new category
      a.modal-default-button(
        href="",
        @click.prevent="SET_IS_ADD_CATEGORY(false)"
      ) &times;
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
import { mapMutations, mapActions } from "vuex";

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
    ...mapMutations(["SET_IS_ADD_CATEGORY"]),
    ...mapActions(["ADD_CATEGORY"]),
    addCategory() {
      this.SET_IS_ADD_CATEGORY(false);
      // this.$emit("submit", this.input);
      // this.$store.dispatch("ADD_CATEGORY", { name: this.input });
      this.ADD_CATEGORY({ name: this.input });
      this.$emit("submit");
    }
  },
  mounted() {
    this.$refs.input.focus();
  }
};
</script>
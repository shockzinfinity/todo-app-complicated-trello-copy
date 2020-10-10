<template lang="pug">
.add-flow
  input.form-control(
    type="text",
    v-if="isAddFlow",
    v-model="inputTitle",
    ref="inputTitle",
    @blur="restore",
    @keypress.enter="onSubmitTitle"
  )
  a(v-else, href="", @click.prevent="onAddFlow") &plus; Add another flow
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isAddFlow: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState({
      category: "category"
    })
  },
  methods: {
    ...mapActions(["ADD_FLOW"]),
    onAddFlow() {
      this.isAddFlow = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    restore() {
      this.isAddFlow = false;
      this.inputTitle = "";
    },
    onSubmitTitle() {
      // console.log("submit");
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return this.restore();
      }
      const name = this.inputTitle;
      const categoryId = this.category.id;
      const lastFlow = this.category.lists[this.category.lists.length - 1];
      const pos = lastFlow ? lastFlow.pos * 2 : 65536;

      this.ADD_FLOW({ name, pos, categoryId }).then(() => this.restore());
    }
  }
};
</script>

<style>
.add-flow {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 12px;
  transition: all 0.3s;
}

.add-flow a {
  color: #dddddd;
}

.add-flow:hover,
.add-flow:focus {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

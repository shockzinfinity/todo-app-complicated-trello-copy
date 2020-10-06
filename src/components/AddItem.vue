<template lang="pug">
.add-item
  form(@submit.prevent="onSubmit")
    input.form-control(type="text", ref="inputText", v-model="inputTitle")
    button.btn.btn-success(type="submit", :disabled="invalidInput") Add TodoItem
    a.cancel-add-btn(href="", @click.prevent="$emit('close')") &times;
</template>

<script>
export default {
  data() {
    return {
      inputTitle: ""
    };
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    }
  },
  methods: {
    onSubmit() {
      // if (this.invalidInput) {
      //   return;
      // }
      // console.log(this.inputTitle);
      console.log("submit!");
      // this.$emit("close");
    },
    setupClickOutside(el) {
      document.querySelector("body").addEventListener("click", e => {
        if (el.contains(e.target)) {
          return;
        }
        this.$emit("close");
      });
    }
  },
  mounted() {
    this.$refs.inputText.focus();
    // this.setupClickOutside(this.$el);
  }
};
</script>

<style>
.add-item {
  padding: 10px;
  display: block;
  position: relative;
}

.add-item .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.add-item .cancel-add-btn:hover,
.add-item .cancel-add-btn:focus {
  color: #666;
}
</style>
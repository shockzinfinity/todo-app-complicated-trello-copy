<template lang="pug">
.add-item
  form(@submit.prevent="onSubmit")
    input.form-control(
      type="text",
      ref="inputText",
      v-model="inputTitle",
      @blur="onBlur"
    )
    button.btn.btn-success(type="submit", :disabled="invalidInput") Add TodoItem
    a.cancel-add-btn(href="", @click.prevent="$emit('close')") &times;
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    flowId: {
      type: Number
    }
  },
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
    ...mapActions({
      ADD_TODOITEM: "ADD_TODOITEM"
    }),
    onSubmit() {
      if (this.invalidInput) {
        return;
      }

      const { inputTitle, flowId } = this;

      // TODO: pos 계산 필요
      const pos = this.newItemPos();

      this.ADD_TODOITEM({ name: inputTitle, pos, flowId }).finally(() => {
        this.inputTitle = "";
        this.$emit("close");
      });
    },
    newItemPos() {
      const curList = this.$store.state.category.lists.filter(
        l => l.id === this.flowId
      )[0];

      if (!curList) {
        return 65536;
      }

      const { items } = curList;
      if (!items.length) {
        return 65536;
      }

      return items[items.length - 1].pos * 2;
    },
    onBlur() {
      // console.log(this.inputTitle);
      // console.log(this.invalidInput);
      // if (this.invalidInput) {
      //   console.log(this.inputTitle);
      // }
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

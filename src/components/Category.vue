<template lang="pug">
div
  .category-wrapper
    .category
      .category-header
        input.form-control(
          type="text",
          v-if="isEditTitle",
          v-model="inputTitle",
          ref="inputTitle",
          @keypress.enter="onSubmitTitle"
        )
        span.category-title(v-else, @click="onClickTitle") {{ category.name }}
        a.category-header-btn.show-menu(
          href="",
          @click.prevent="onShowSettings"
        ) ... Show Menu
      .list-section-wrapper
        .list-section
          .list-wrapper(
            v-for="flow in category.lists",
            :key="flow.pos",
            :data-flow-id="flow.id",
            :data-flow-name="flow.name"
          )
            list(:data="flow")
          .list-wrapper
            add-flow
  category-settings(v-if="isShowCategorySettings")
  router-view
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import List from "@/components/List";
import dragger from "@/utils/dragger";
import CategorySettings from "@/components/CategorySettings";
import AddFlow from "@/components/AddFlow";

export default {
  name: "Category",
  components: {
    List,
    CategorySettings,
    AddFlow
  },
  data() {
    return {
      cid: 0,
      loading: false,
      tDragger: null,
      fDragger: null,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState({
      category: "category",
      isShowCategorySettings: "isShowCategorySettings"
    })
  },
  methods: {
    ...mapMutations(["SET_THEME", "SET_IS_SHOW_CATEGORY_SETTINGS"]),
    ...mapActions([
      "FETCH_CATEGORY",
      "UPDATE_TODOITEM",
      "PATCH_TODOITEM",
      "UPDATE_CATEGORY",
      "UPDATE_FLOW"
    ]),
    fetchData() {
      this.loading = true;
      return this.FETCH_CATEGORY({ id: this.$route.params.cid }).then(
        () => (this.loading = false)
      );
    },
    setItemDraggble() {
      if (this.tDragger) {
        this.tDragger.destroy();
      }
      this.tDragger = dragger.init(
        Array.from(this.$el.querySelectorAll(".todo-list"))
      );

      this.tDragger.on("drop", (el, wrapper, target, siblings) => {
        const targetItem = {
          id: el.dataset.todoId * 1,
          flowId: wrapper.dataset.flowId * 1,
          pos: 65536
        };

        const { prev, next } = dragger.siblings({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll(".todo-item")),
          type: "todo"
        });

        if (!prev && next) {
          // 맨앞
          targetItem.pos = next.pos / 2;
        } else if (!next && prev) {
          // 맨뒤
          targetItem.pos = prev.pos * 2;
        } else if (prev && next) {
          targetItem.pos = (prev.pos + next.pos) / 2;
        }
        this.PATCH_TODOITEM({
          id: targetItem.id,
          pos: targetItem.pos,
          flowId: targetItem.flowId
        });
      });
    },
    setFlowDraggble() {
      if (this.fDragger) {
        this.fDragger.destroy();
      }

      // dragula options 설정 (입력 버튼은 드래그 적용 안되도록...)
      const options = {
        invalid: (el, handle) => !/^list/.test(handle.className)
      };

      this.fDragger = dragger.init(
        Array.from(this.$el.querySelectorAll(".list-section")),
        options
      );

      this.fDragger.on("drop", (el, wrapper, target, siblings) => {
        const targetFlow = {
          id: el.dataset.flowId * 1,
          name: el.dataset.flowName,
          pos: 65536,
          categoryId: this.category.id
        };

        const { prev, next } = dragger.siblings({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll(".list")),
          type: "flow"
        });

        if (!prev && next) {
          // 맨앞
          targetFlow.pos = next.pos / 2;
        } else if (!next && prev) {
          // 맨뒤
          targetFlow.pos = prev.pos * 2;
        } else if (prev && next) {
          targetFlow.pos = (prev.pos + next.pos) / 2;
        }
        this.UPDATE_FLOW({
          id: targetFlow.id,
          pos: targetFlow.pos,
          name: targetFlow.name,
          categoryId: targetFlow.categoryId
        });
      });
    },
    onShowSettings() {
      this.SET_IS_SHOW_CATEGORY_SETTINGS(true);
    },
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    onSubmitTitle() {
      this.isEditTitle = false;
      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return;
      }
      const id = this.category.id;
      const name = this.category.name;
      const bgColor = this.category.bgColor;
      if (name === this.inputTitle) {
        return;
      }
      this.UPDATE_CATEGORY({ id, name: this.inputTitle, bgColor });
    }
  },
  created() {
    this.fetchData().then(() => {
      this.inputTitle = this.category.name;
      this.SET_THEME(this.category.bgColor);
    });
    this.SET_IS_SHOW_CATEGORY_SETTINGS(false);
  },
  updated() {
    this.setItemDraggble();
    this.setFlowDraggble();
  }
};
</script>

<style>
.category-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.category {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.category-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}

.category-header input[type="text"] {
  width: 200px;
}

.category-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #ffffff;
}

.category-header-btn:hover,
.category-header-btn:focus {
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.category-title {
  font-weight: 700;
  font-size: 18px;
}

.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}

.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}

.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}

.todo-item.gu-transit {
  background-color: #555 !important;
}

.todo-item.gu-mirror {
  opacity: 1 !important;
  background-color: #ffffff !important;
  transform: rotate(3deg) !important;
}
</style>

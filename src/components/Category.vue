<template lang="pug">
div
  .category-wrapper
    .category
      .category-header
        span.category-title {{ category.name }}
      //- pre {{ category }}
      .list-section-wrapper
        .list-section
          .list-wrapper(v-for="flow in category.lists", :key="flow.pos")
            list(:data="flow")
  router-view
</template>

<script>
import { mapState, mapActions } from "vuex";
import List from "@/components/List";
import dragula from "dragula";
import "dragula/dist/dragula.css";

export default {
  name: "Category",
  components: {
    List
  },
  data() {
    return {
      cid: 0,
      loading: false,
      dragulaItems: null
    };
  },
  computed: {
    ...mapState({
      category: "category"
    })
  },
  methods: {
    ...mapActions(["FETCH_CATEGORY", "UPDATE_TODOITEM", "PATCH_TODOITEM"]),
    fetchData() {
      this.loading = true;
      this.FETCH_CATEGORY({ id: this.$route.params.cid }).then(
        () => (this.loading = false)
      );
    }
  },
  created() {
    this.fetchData();
  },
  updated() {
    if (this.dragulaItems) {
      this.dragulaItems.destroy();
    }

    this.dragulaItems = dragula([
      ...Array.from(this.$el.querySelectorAll(".todo-list"))
    ]).on("drop", (el, wrapper, target, siblings) => {
      // console.log("drop");
      // debugger;
      const targetItem = {
        id: el.dataset.todoId * 1,
        pos: 65535
      };
      let prevTodo = null;
      let nextTodo = null;
      // debugger;
      Array.from(wrapper.querySelectorAll(".todo-item")).forEach(
        (el, idx, arr) => {
          const todoId = el.dataset.todoId * 1;
          if (todoId === targetItem.id) {
            prevTodo =
              idx > 0
                ? {
                    id: arr[idx - 1].dataset.todoId * 1,
                    pos: arr[idx - 1].dataset.todoPos * 1
                  }
                : null;
            nextTodo =
              idx < arr.length - 1
                ? {
                    id: arr[idx + 1].dataset.todoId * 1,
                    pos: arr[idx + 1].dataset.todoPos * 1
                  }
                : null;
          }
        }
      );

      if (!prevTodo && nextTodo) {
        // 맨앞
        targetItem.pos = nextTodo.pos / 2;
      } else if (!nextTodo && prevTodo) {
        // 맨뒤
        targetItem.pos = prevTodo.pos * 2;
      } else if (prevTodo && nextTodo) {
        targetItem.pos = (prevTodo.pos + nextTodo.pos) / 2;
      }
      // console.log(targetItem);
      this.PATCH_TODOITEM({ id: targetItem.id, pos: targetItem.pos });
    });
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

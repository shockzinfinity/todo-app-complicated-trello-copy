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

export default {
  name: "Category",
  components: {
    List
  },
  data() {
    return {
      cid: 0,
      loading: false
    };
  },
  computed: {
    ...mapState({
      category: "category"
    })
  },
  methods: {
    ...mapActions(["FETCH_CATEGORY"]),
    fetchData() {
      this.loading = true;
      this.FETCH_CATEGORY({ id: this.$route.params.cid }).then(
        () => (this.loading = false)
      );
    }
  },
  created() {
    this.fetchData();
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
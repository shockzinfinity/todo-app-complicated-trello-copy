<template lang="pug">
div
  .home-title Personal Categories
  .category-list(ref="categoryList")
    .category-item(
      v-for="c in categories",
      :key="c.id",
      :data-bgcolor="c.bgColor",
      ref="categoryItem"
    )
      router-link(:to="`/c/${c.id}`")
        .category-item-title {{ c.name }}
    .category-item.category-item-new
      a.new-category-btn(href="", @click.prevent="SET_IS_ADD_CATEGORY(true)") Create new Category
  add-category(v-if="isAddCategory", @submit="onAddCategory")
</template>

<script>
import AddCategory from "@/components/AddCategory";
import { mapMutations, mapState } from "vuex";
import { category } from "../api";

export default {
  name: "Home",
  components: { AddCategory },
  data() {
    return {
      categories: [],
      loading: false,
      error: ""
    };
  },
  computed: {
    ...mapState(["isAddCategory"])
  },
  methods: {
    ...mapMutations(["SET_IS_ADD_CATEGORY"]),
    fetchData() {
      this.loading = true;
      category
        .fetch()
        .then(data => {
          this.categories = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onAddCategory() {
      // console.log(name);
      // api
      // category
      //   .create(name)
      //   .then(data => {
      //     this.fetchData();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.$refs.categoryItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  }
};
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.category-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.category-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}

.category-item-new {
  background-color: #dddddd;
}

.category-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.category-item a:hover,
.category-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}

.category-item-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}

.category-item a.new-category-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
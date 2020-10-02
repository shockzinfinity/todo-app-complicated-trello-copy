<template lang="pug">
div Home
  div Category List:
    div(v-if="loading") Loading...
    div(v-else) API response:
      div(v-for="c in categories", :key="c.id") {{ c }}
    ul
      li
        router-link(to="/c/1") Category 1
      li
        router-link(to="/c/2") Category 2
      li
        router-link(to="/c/3") Category 3
</template>

<script>
import { category } from "../api";
export default {
  data() {
    return {
      categories: [],
      loading: false
    };
  },
  methods: {
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
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style>
</style>
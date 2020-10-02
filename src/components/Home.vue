<template lang="pug">
div Home
  div Board List:
    div(v-if="loading") Loading...
    div(v-else) API response:
      div(v-for="b in boards", :key="b.id") {{ b }}
    ul
      li
        router-link(to="/b/1") Board 1
      li
        router-link(to="/b/2") Board 2
      li
        router-link(to="/b/3") Board 3
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boards: [],
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;

      axios
        .get("https://localhost:4001/api/category")
        .then(res => {
          this.boards = res.data;
        })
        .catch(res => {
          // this.error = res.response.data;
          this.$router.replace("/login");
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
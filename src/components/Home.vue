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
import { board } from "../api";
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
      board
        .fetch()
        .then(data => {
          this.boards = data;
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
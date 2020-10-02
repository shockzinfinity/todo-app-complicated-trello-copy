<template lang="pug">
div Home
  div Board List:
    div(v-if="loading") Loading...
    div(v-else) API response:
      pre {{ apiRes }}
    div(v-if="error") Error:
      pre {{ error }}
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
      apiRes: "",
      error: "",
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;

      axios
        .get("https://localhost:4001/weatherforecast")
        .then(res => {
          this.apiRes = res.data;
        })
        .catch(res => {
          this.error = res.response.data;
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
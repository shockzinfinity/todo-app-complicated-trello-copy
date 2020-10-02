<template lang="pug">
div Home
  div Board List:
    div(v-if="loading") Loading...
    div(v-else) API response: {{ apiRes }}
    ul
      li
        router-link(to="/b/1") Board 1
      li
        router-link(to="/b/2") Board 2
      li
        router-link(to="/b/3") Board 3
</template>

<script>
export default {
  data() {
    return {
      apiRes: "",
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;

      const req = new XMLHttpRequest();

      req.open("GET", "https://localhost:4001/weatherforecast");
      req.send();
      req.addEventListener("load", () => {
        this.loading = false;
        this.apiRes = {
          status: req.status,
          statusText: req.statusText,
          response: JSON.parse(req.response)
        };
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
<template lang="pug">
div
  div Todo
  div(v-if="loading") loading todo items...
  div(v-else)
    span tid: {{ tid }}
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      tid: 0,
      loading: false
    };
  },
  watch: {
    $route: {
      handler: "fetchData",
      immediate: true
    }
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.tid = this.$route.params.tid;
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style>
</style>
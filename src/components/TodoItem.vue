<template lang="pug">
div
  div Todo Item
  div(v-if="loading") loading todo items...
  div(v-else)
    span tid: {{ tid }}
</template>

<script>
export default {
  name: "TodoItem",
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
<template lang="pug">
div
  div Board
  div(v-if="loading") Loading board...
  div(v-else)
    span bid: {{ bid }}
    div
      router-link(:to="`/b/${bid}/c/1`") Card 1
      span
      = ' '
      router-link(:to="`/b/${bid}/c/2`") Card 2
      span
      = ' '
      router-link(:to="`/b/${bid}/c/3`") Card 3
  hr
  router-view
</template>

<script>
export default {
  name: "Board",
  data() {
    return {
      bid: 0,
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      // backend call
      setTimeout(() => {
        this.bid = this.$route.params.bid;
        this.loading = false;
      }, 500);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
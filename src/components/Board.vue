<template lang="pug">
div
  div Board
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
      bid: 0
    };
  },
  created() {
    this.bid = this.$route.params.bid;
  }
};
</script>
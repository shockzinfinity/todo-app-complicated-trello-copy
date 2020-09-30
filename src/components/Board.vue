<template lang="pug">
div
  div Board
  span bid: {{ bid }}
</template>

<script>
export default {
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
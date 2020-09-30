<template lang="pug">
div
  div Card
  span cid: {{ cid }}
</template>

<script>
export default {
  data() {
    return {
      cid: 0
    };
  },
  created() {
    // console.log(this.$route.params);
    this.cid = this.$route.params.cid;
  }
};
</script>

<style>
</style>
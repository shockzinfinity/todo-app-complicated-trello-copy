<template lang="pug">
div
  div Card
  div(v-if="loading") loading cards...
  div(v-else)
    span cid: {{ cid }}
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      cid: 0,
      loading: false
    };
  },
  watch: {
    $route() {
      // this.cid = this.$route.params.cid;
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 500);
    }
  },
  created() {
    // console.log(this.$route.params);
    // this.cid = this.$route.params.cid;
    this.fetchData();
  }
};
</script>

<style>
</style>
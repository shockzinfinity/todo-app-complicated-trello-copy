<template lang="pug">
div
  div Category
  div(v-if="loading") Loading category...
  div(v-else)
    span cid: {{ cid }}
    div
      router-link(:to="`/c/${bid}/t/1`") Todo Item 1
      span
      = ' '
      router-link(:to="`/c/${bid}/t/2`") Todo Item 2
      span
      = ' '
      router-link(:to="`/c/${bid}/t/3`") Todo Item 3
  hr
  router-view
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      cid: 0,
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      // backend call
      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 500);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
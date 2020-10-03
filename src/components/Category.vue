<template lang="pug">
div
  div Category
  div(v-if="loading") Loading category...
  div(v-else)
    span cid: {{ cid }}
    pre {{ category }}
    div
      router-link(:to="`/c/${cid}/t/1`") Todo Item 1
      span
      = ' '
      router-link(:to="`/c/${cid}/t/2`") Todo Item 2
      span
      = ' '
      router-link(:to="`/c/${cid}/t/3`") Todo Item 3
  hr
  router-view
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Category",
  data() {
    return {
      cid: 0,
      loading: false
    };
  },
  computed: {
    ...mapState({
      category: "category"
    })
  },
  methods: {
    ...mapActions(["FETCH_CATEGORY"]),
    fetchData() {
      this.loading = true;
      this.FETCH_CATEGORY({ id: this.$route.params.cid }).then(
        () => (this.loading = false)
      );
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
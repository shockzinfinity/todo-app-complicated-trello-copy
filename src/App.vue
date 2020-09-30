<template lang="pug">
#app
  navbar
  router-view
</template>

<script>
import Navbar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  }
};
</script>

<style>
</style>
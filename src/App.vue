<template lang="pug">
#app
  router-link(to="/") Home
  span
  = ' '
  router-link(to="/login") Login
  router-view
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
</style>
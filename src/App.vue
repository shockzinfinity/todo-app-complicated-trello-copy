<template lang="pug">
#app
  a(href="/") Home
  span
  = ' '
  a(href="/login") Login
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
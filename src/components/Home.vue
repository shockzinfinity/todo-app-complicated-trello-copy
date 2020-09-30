<template lang="pug">
div Home
  div Board List:
    ul
      li
        router-link(to="/b/1") Board 1
      li
        router-link(to="/b/2") Board 2
      li
        router-link(to="/b/3") Board 3
</template>

<script>
export default {};
</script>

<style>
</style>
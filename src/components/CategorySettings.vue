<template lang="pug">
.category-menu
  .category-menu-header
    .header-title Menu
    a.header-close-btn(href="", @click.prevent="onClose") &times;
  ul.menu-list
    li Menu 1
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["SET_IS_SHOW_CATEGORY_SETTINGS"]),
    onClose() {
      this.SET_IS_SHOW_CATEGORY_SETTINGS(false);
    }
  }
};
</script>

<style>
.category-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all 0.3s;
}

.category-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbbbbb solid 1px;
}

.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight: 700;
}

.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}

.menu-list {
  list-style: none;
  padding-left: 0px;
}

.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}

.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0, 0, 0, 0.1);
}

.menu-list li a {
  text-decoration: none;
  color: inherit;
}

.color-picker {
  margin: 0 15px;
}

.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
}
</style>

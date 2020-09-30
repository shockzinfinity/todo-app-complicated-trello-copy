import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const Login = {
  name: "Login",
  template: "<div>Login page..</div>",
};

const NotFound = {
  name: "NotFound",
  template: "<div>Page not found.</div>",
};

const routes = {
  "/": App,
  "/login": Login,
};

new Vue({
  computed: {
    VueComponent() {
      return routes[window.location.pathname] || NotFound;
    },
  },
  render(h) {
    return h(this.VueComponent);
  },
}).$mount("#app");

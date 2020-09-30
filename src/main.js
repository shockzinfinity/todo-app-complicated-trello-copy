import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const Login = {
  name: "Login",
  template: "<div>Login page..</div>",
};

const routes = {
  "/": App,
  "/login": Login,
};

new Vue({
  computed: {
    VueComponent() {
      return (
        routes[window.location.pathname] || {
          template: "<div>Page not found.</div>",
        }
      );
    },
  },
  render(h) {
    return h(this.VueComponent);
  },
}).$mount("#app");

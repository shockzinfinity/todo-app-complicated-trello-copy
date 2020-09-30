import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const Login = {
  name: "Login",
  template: "<div>Login page..</div>",
};

const NotFound = {
  name: "NotFound",
  template: "<div>Page not found.</div>",
};

const router = new VueRouter({
  routes: [
    { path: "/", component: App },
    { path: "/login", component: Login },
    { path: "*", component: NotFound },
  ],
});

new Vue({
  router,
  render: (h) => h({ template: "<router-view></router-view>" }),
}).$mount("#app");

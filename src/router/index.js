import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import NotFound from "@/components/NotFound.vue";
import Category from "@/components/Category.vue";
import TodoItem from "@/components/TodoItem.vue";
import store from "../store";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  // const isAuth = localStorage.getItem("token");
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;

  store.getters.isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    {
      path: "/c/:cid",
      component: Category,
      beforeEnter: requireAuth,
      children: [
        { path: "t/:tid", component: TodoItem, beforeEnter: requireAuth },
      ],
    },
    { path: "*", component: NotFound },
  ],
});

export default router;

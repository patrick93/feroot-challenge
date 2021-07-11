import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sign-in",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

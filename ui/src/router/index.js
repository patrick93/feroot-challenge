import Vue from "vue";
import VueRouter from "vue-router";

import authService from "../services/auth.service";

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
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "welcome" */ "../views/Welcome.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (authService.getToken()) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }
});

export default router;

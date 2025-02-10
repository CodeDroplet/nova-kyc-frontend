import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";
import Register from "@/pages/auth/Register.vue";
import Login from "@/pages/auth/Login.vue";
import AuthService from "@/services/AuthService";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",

    beforeEnter: async (_to, _from, next) => {
      try {
        await AuthService.me();
        next();
      } catch (error) {
        next({ name: "login" });
        return;
      }
    },
  },
  {
    path: "/auth/register",
    component: Register,
    name: "register",
  },
  {
    path: "/auth/login",
    component: Login,
    name: "login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";
import Register from "@/pages/auth/Register.vue";
import Login from "@/pages/auth/Login.vue";
import { useAuthStore } from "@/stores/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",

    beforeEnter: (_to, _from, next) => {
      const authStore = useAuthStore();
      if (!authStore.token) {
        next({ name: "login" });
        return;
      }
      next();
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

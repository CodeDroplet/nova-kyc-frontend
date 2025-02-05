import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import Dashboard from "@/pages/Dashboard.vue";

const routes: RouteRecordRaw[] = [{ path: "/", component: Dashboard, name: "dashboard" }];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

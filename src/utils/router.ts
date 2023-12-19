import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("@/view/home/HomeView.vue") },
  { path: "/resort/:id", component: () => import("@/view/resort/ResortView.vue") },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

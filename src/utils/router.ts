import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("@/view/home/HomeView.vue") },
  { path: "/scenic-spot/:id", component: () => import("@/view/scenic-spot/ScenicSpotView.vue") },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

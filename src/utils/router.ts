import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("@/view/home/HomeView.vue") },
  { path: "/resort/:id", component: () => import("@/view/resort/ResortView.vue") },
  { path: "/navi/:id", component: () => import("@/view/resort/NavigationView.vue") },
  { path: "/guide/:id", component: () => import("@/view/guide/TravelGuide.vue") },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

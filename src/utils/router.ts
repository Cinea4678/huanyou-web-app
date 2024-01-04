import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: () => import("@/view/home/HomeView.vue") },
  { path: "/resort/:id", component: () => import("@/view/resort/ResortView.vue") },
  { path: "/navi/:id", component: () => import("@/view/resort/NavigationView.vue") },
  { path: "/guide/:id", component: () => import("@/view/guide/TravelGuide.vue") },
  { path: "/record/:id", component: () => import("@/view/record/TravelRecord.vue") },
  { path: "/login", component: () => import("@/view/user/LoginView.vue") },
  { path: "/register", component: () => import("@/view/user/RegisterView.vue") },
  { path: "/user", component: () => import("@/view/user/UserProfile.vue") },
  { path: "/new", component: () => import("@/view/new/NewPost.vue") },
  { path: "/resorts", component: () => import("@/view/resort/ResortList.vue") },
  { path: "/guides", component: () => import("@/view/guide/GuideList.vue") },
  { path: "/records", component: () => import("@/view/record/RecordList.vue") },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

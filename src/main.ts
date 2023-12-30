import { createApp } from "vue"
import "./style.css"

import "@/utils/time.ts"

import svgIcon from "@/components/svgIcon/index.vue"
import "virtual:svg-icons-register"

import App from "./App.vue"

import router from "@/utils/router.ts"
import { key, store } from "@/utils/store.ts"

createApp(App).use(router).use(store, key).component("svg-icon", svgIcon).mount("#app")

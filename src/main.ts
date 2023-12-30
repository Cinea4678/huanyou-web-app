import { createApp } from "vue"
import "./style.css"
import "font-pingfang-sc-font-weight-improved"

import "@/utils/time.ts"

import svgIcon from "@/components/svgIcon/index.vue"
import "virtual:svg-icons-register"

import App from "./App.vue"

import router from "@/utils/router.ts"

createApp(App).use(router).component("svg-icon", svgIcon).mount("#app")

import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

import Components from "unplugin-vue-components/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import mockDevServerPlugin from "vite-plugin-mock-dev-server"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, "./src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    mockDevServerPlugin({
      include: ["src/mock/**/*.mock.{js,ts,cjs,mjs,json,json5}"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/theme.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      "^/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

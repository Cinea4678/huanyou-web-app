<script lang="ts" setup>
import { onMounted } from "vue"
import { GetCurrentUserInfo } from "@/services/api.ts"
import { useStore } from "@/utils/store.ts"

const store = useStore()

onMounted(() => {
  // 验证登录状态
  GetCurrentUserInfo().then((res) => {
    if (res) {
      store.commit("logIn", res)
    } else {
      store.commit("logOut")
    }
  })
})
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#388E3C',
      },
    }"
  >
    <div class="app-container">
      <suspense>
        <router-view />
        <template #fallback>
          <div class="flex w-full h-full justify-center items-center">
            <svg-icon name="InfLoading" />
          </div>
        </template>
      </suspense>
    </div>
  </a-config-provider>
</template>

<style>
body {
  background-size: cover;
  background: #d7ece6;
  background: url("/mesh.png") no-repeat center center fixed;

  margin: 0;

  font-weight: lighter;

  --app-padl: 12px;
  --app-padr: 12px;
  --app-padx: calc(var(--app-padl) + var(--app-padr));
}

body:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40vh;
  background: linear-gradient(to bottom, #d7ece6 30%, #d7ece600);

  z-index: 0;
}

p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.app-container {
  min-height: 100vh;
  position: relative;
  z-index: 1;

  padding-left: var(--app-padl);
  padding-right: var(--app-padr);
}
</style>

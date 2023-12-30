<script setup lang="ts">
import { useRouter } from "vue-router"
import { reactive, ref } from "vue"
import { message } from "ant-design-vue"
import { Login } from "@/services/api.ts"

const router = useRouter()

const loading = ref(false)

const loginForm = reactive({
  username: "",
  password: "",
})

const login = () => {
  if (loginForm.username == "" || loginForm.password == "") {
    message.warn("用户名或密码未填")
    return
  }

  loading.value = true
  Login(loginForm.username, loginForm.password)
    .then(() => {
      message.success("登录成功")
      router.push("/").then(() => location.reload())
    })
    .finally(() => {
      loading.value = false
    })
}

const register = () => {
  router.push("/register")
}
</script>

<template>
  <div>
    <page-header title="登录" />
    <div class="mt-[10vh] w-full flex justify-center">
      <img src="/Huanyou.png" alt="寰游" class="w-[200px] h-[100px] object-contain mx-auto" />
    </div>
    <div class="mt-[50px] max-w-[300px] mx-auto flex flex-col gap-4">
      <a-input v-model:value="loginForm.username" size="large" placeholder="手机号" />
      <a-input v-model:value="loginForm.password" type="password" size="large" placeholder="密码" />
    </div>
    <div class="mt-[60px] flex flex-col gap-6 justify-center items-center">
      <a-button type="primary" size="large" class="w-[150px]" @click="login" :loading="loading">登录</a-button>
      <a-button size="large" class="w-[150px]" @click="register">注册</a-button>
    </div>
  </div>
</template>

<style scoped></style>

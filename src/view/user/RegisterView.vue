<script setup lang="ts">
import { reactive, ref } from "vue"
import { CheckPhoneNumber } from "@/services/api.ts"
import RegisteredUser = Model.RegisteredUser
import { message } from "ant-design-vue"

const step = ref(0)
const maxStep = ref(2)

const allowNext = ref(false)
const loading = ref(false)

const user = reactive<RegisteredUser>({ id: 0 })

const checkPhone = () => {
  if (user.phoneNumber == undefined || user.phoneNumber.length == 0) {
    message.warn("请输入手机号")
    return
  }
  loading.value = true
  CheckPhoneNumber(user.phoneNumber ?? "")
    .then((res) => {
      allowNext.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="ctn">
    <page-header title="注册" />
    <div class="mt-[5vh] w-full flex justify-center">
      <img src="/Huanyou.png" alt="寰游" class="w-[200px] h-[100px] object-contain mx-auto" />
    </div>
    <div class="mt-[50px] max-w-[300px] mx-auto" v-if="step == 0">
      <div class="flex flex-col gap-4">
        <div>欢迎👏请首先输入并验证你的手机号</div>
        <div class="border-x-0 border-t-0 border-solid border-b border-b-black/20">
          <a-input v-model:value="user.phoneNumber" size="large" :bordered="false" placeholder="手机号" />
        </div>
        <a-button class="bg-transparent" :loading="loading" @click="checkPhone">验证手机号</a-button>
      </div>
    </div>
    <div class="mt-[50px] max-w-[300px] mx-auto" v-if="step == 1">
      <div class="flex flex-col gap-4">
        <a-input size="large" placeholder="手机号" />
        <div class="flex gap-1">
          <a-input size="large" placeholder="验证码" />
          <a-button size="large">获取验证码</a-button>
        </div>
        <a-input size="large" placeholder="昵称" />
        <a-input type="password" size="large" placeholder="密码" />
        <a-input type="password" size="large" placeholder="确认密码" />
      </div>
    </div>
    <div class="mt-[60px] flex flex-col gap-6 justify-center items-center">
      <a-button v-if="step > 0" size="large" class="w-[150px]" @click="step--">上一步</a-button>
      <a-button
        v-if="step < maxStep"
        :disabled="!allowNext"
        type="primary"
        size="large"
        class="w-[150px]"
        @click="step++"
        >下一步</a-button
      >
      <a-button v-else :disabled="!allowNext" type="primary" size="large" class="w-[150px]">完成</a-button>
    </div>
  </div>
</template>

<style scoped></style>

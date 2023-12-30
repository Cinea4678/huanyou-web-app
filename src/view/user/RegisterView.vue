<script setup lang="ts">
import { reactive, ref } from "vue"
import { CheckPhoneNumber, Register } from "@/services/api.ts"
import RegisteredUser = Model.RegisteredUser
import { message } from "ant-design-vue"
import { useStore } from "@/utils/store.ts"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()

const step = ref(2)
const maxStep = ref(2)

const allowNext = ref([false, false, false])
const loading = ref(false)

const user = reactive<RegisteredUser>({ id: 0 })
const passwordConfirm = ref("")

const checkPhone = () => {
  if (user.phoneNumber == undefined || user.phoneNumber.length == 0) {
    message.warn("请输入手机号")
    return
  }
  loading.value = true
  CheckPhoneNumber(user.phoneNumber ?? "")
    .then(() => {
      allowNext.value[0] = true
    })
    .finally(() => {
      loading.value = false
    })
}

const passwordChange = () => {
  allowNext.value[1] = passwordConfirm.value == user.passwordHash
}

const checkInfoOk = () => {
  allowNext.value[2] = user.gender != undefined && user.name != undefined && user.name != ""
}

const register = () => {
  loading.value = true
  Register(user)
    .then(() => {
      message.success("恭喜，注册成功！请返回登录").then(() => {
        router.push("/login")
      })
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
        <div class="mt-2 text-sm text-gray-500">手机号之后将是你的账号的登录凭证</div>
      </div>
    </div>

    <div class="mt-[50px] max-w-[300px] mx-auto" v-if="step == 1">
      <div class="flex flex-col gap-4">
        <div>接下来，请为自己设置一个安全🔐的密码</div>
        <div class="border-x-0 border-t-0 border-solid border-b border-b-black/20">
          <a-input type="password" v-model:value="user.passwordHash" size="large" :bordered="false" placeholder="密码" />
        </div>
        <div class="border-x-0 border-t-0 border-solid border-b border-b-black/20">
          <a-input type="password" v-model:value="passwordConfirm" size="large" :bordered="false" placeholder="确认密码" @change="passwordChange" />
        </div>
      </div>
    </div>

    <div class="mt-[50px] max-w-[300px] mx-auto" v-if="step == 2">
      <div class="flex flex-col gap-4">
        <div>最后，请让大家更了解你一些❤️</div>
        <div class="border-x-0 border-t-0 border-solid border-b border-b-black/20">
          <a-input v-model:value="user.name" size="large" :bordered="false" placeholder="昵称" @change="checkInfoOk" />
        </div>
        <div class="mt-5 w-full">
          <a-radio-group v-model:value="user.gender" size="large" @change="checkInfoOk">
            <a-radio-button value="男">我是男生</a-radio-button>
            <a-radio-button value="女">我是女生</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="mt-[60px] flex flex-col gap-6 justify-center items-center">
      <a-button v-if="step > 0" size="large" class="w-[150px]" @click="step--">上一步</a-button>
      <a-button v-if="step < maxStep" :disabled="!allowNext[step]" type="primary" size="large" class="w-[150px]" @click="step++"> 下一步 </a-button>
      <a-button v-else :disabled="!allowNext[step]" type="primary" size="large" class="w-[150px]" :loading="loading" @click="register">完成</a-button>
    </div>
  </div>
</template>

<style scoped></style>

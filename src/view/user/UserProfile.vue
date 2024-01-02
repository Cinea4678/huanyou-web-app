<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import RegisteredUser = Model.RegisteredUser
import { useRoute } from "vue-router"
import { GetUserAvatarUrl, GetUserInfo } from "@/services/api.ts"

const route = useRoute()

const userId = computed(() => {
  let c = route.query["id"] ?? null
  if (c instanceof Array) {
    return c[0]
  } else {
    return c
  }
})

const user = ref<RegisteredUser | null>(null)
const userInfoBoxBg = ref<HTMLDivElement | null>(null)

const userAvatar = computed(() => GetUserAvatarUrl(user.value?.id ?? 0))

user.value = await GetUserInfo(userId.value)

onMounted(() => {
  userInfoBoxBg.value!.style.background = `url("${userAvatar.value}") center`
})
</script>

<template>
  <div>
    <page-header title="用户中心" />
    <div class="relative pt-2 pb-4 px-3 rounded-t-2xl overflow-clip">
      <div ref="userInfoBoxBg" class="user-info-box-bg absolute top-0 bottom-0 left-0 w-full h-full scale-150"></div>
      <div class="h-[100px]"></div>
    </div>
    <div class="bg-white pt-2 pb-4 px-3 rounded-b-2xl">
      <div class="h-[100px]"></div>
    </div>
  </div>
</template>

<style scoped>
.user-info-box-bg {
  content: "";
  background-size: contain;

  filter: blur(40px) brightness(0.6);
}
</style>

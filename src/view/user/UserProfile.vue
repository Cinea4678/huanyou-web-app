<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import RegisteredUser = Model.RegisteredUser
import { useRoute } from "vue-router"
import { GetUserAvatarUrl, GetUserInfo } from "@/services/api.ts"

const route = useRoute()

const userId = computed(() => {
  let c = route.params["id"] ?? null
  if (c instanceof Array) {
    return c[0]
  } else {
    return c
  }
})

const user = ref<RegisteredUser | null>(null)
const userInfoBox = ref<HTMLDivElement | null>(null)

const userAvatar = computed(() => GetUserAvatarUrl(user.value?.id ?? 0))

user.value = await GetUserInfo(userId.value)

onMounted(() => {
  let userInfoBoxBefore = getComputedStyle(userInfoBox.value!, "::before")
  console.log(userInfoBoxBefore)
  userInfoBoxBefore.background = `url("${userAvatar}") center`
  console.log(userInfoBoxBefore)
})
</script>

<template>
  <div>
    <page-header title="用户中心" />
    <div ref="userInfoBox" class="user-info-box pt-2 pb-4 px-3 rounded-t-2xl">
      <div class="h-[100px]"></div>
    </div>
    <div class="bg-white pt-2 pb-4 px-3 rounded-b-2xl">
      <div class="h-[100px]"></div>
    </div>
  </div>
</template>

<style scoped>
.user-info-box:before {
  content: "";
  background-size: cover;

  filter: blur(8px);
}
</style>

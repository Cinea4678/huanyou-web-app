<script lang="ts" setup>
import { computed, h, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { GetTravelGuideByAuthor, GetTravelRecordByAuthor, GetUserAvatarUrl, GetUserInfo } from "@/services/api.ts"
import dayjs from "dayjs"
import { useStore } from "@/utils/store.ts"

import { Empty as AEmpty } from "ant-design-vue"
import RegisteredUser = Model.RegisteredUser

const store = useStore()
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

const userRecords = ref<Model.TravelRecord[]>([])
const userGuides = ref<Model.TravelGuide[]>([])

const userAvatar = computed(() => GetUserAvatarUrl(user.value?.id ?? 0))
const currentUserId = computed<number | undefined>(() => {
  if (user.value) {
    return user.value.id
  } else if (store.state.loggedIn) {
    return store.state.user?.id
  } else if (userId.value != undefined && userId.value.length > 0) {
    return Number(userId.value)
  } else {
    return undefined
  }
})
const isMyProfile = computed(() => {
  return userId.value == null || userId.value == store.state.user?.id
})

const none = (name: string) => {
  return h(AEmpty, {
    description: `用户没有发表过${name}`,
    class: "mt-10",
  })
}

const userAge = (user: RegisteredUser): number => {
  const birthDate = dayjs(user.birthday)
  return dayjs().diff(birthDate, "year")
}

user.value = await GetUserInfo(userId.value)

onMounted(() => {
  userInfoBoxBg.value!.style.background = `url("${userAvatar.value}") center`

  if (currentUserId.value) {
    GetTravelRecordByAuthor(currentUserId.value.toString()).then((res) => (userRecords.value = res))
    GetTravelGuideByAuthor(currentUserId.value.toString()).then((res) => (userGuides.value = res))
  }
})
</script>

<template>
  <div>
    <page-header title="用户中心" />
    <div class="relative pt-2 pb-4 px-3 rounded-t-2xl overflow-clip">
      <div ref="userInfoBoxBg" class="user-info-box-bg absolute -top-24 -bottom-24 -left-24 -right-24 z-5"></div>
      <div class="relative z-10 text-white pt-7 pb-2 px-3">
        <div class="flex items-center gap-3">
          <img :src="userAvatar" alt="" class="h-[72px] w-[72px] rounded-full border-solid border-[1.8px] border-white shrink-0" />
          <div class="flex flex-col">
            <div class="text-lg">{{ user?.name }}</div>
            <div class="flex gap-2 text-xs">
              <span>{{ user?.gender }}</span>
              <span v-if="user?.birthday">{{ userAge(user) }} 岁</span>
            </div>
            <div class="flex gap-3 mt-2.5">
              <div class="flex items-center gap-1.5">
                <div class="text-xs text-gray-300">关注</div>
                <div class="text-sm font-bold">96</div>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="text-xs text-gray-300">粉丝</div>
                <div class="text-sm font-bold">96</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white pt-2 pb-4 px-3 rounded-b-2xl">
      <div>
        <div class="pt-2 pb-4 text-sm">
          <div v-if="user?.signature && user?.signature.length > 0" class="font-[GenRyuMin]">{{ user?.signature }}</div>
          <div v-else class="italic text-gray-500">用户未设置个性签名</div>
        </div>
        <div v-if="isMyProfile" class="flex gap-1">
          <a-button class="grow" size="small">编辑资料</a-button>
          <a-button class="grow" size="small">关注/粉丝</a-button>
        </div>
        <div v-else class="flex gap-1">
          <a-button class="grow" type="primary" size="small"><i class="fa-solid fa-plus mr-1" /> 关注</a-button>
          <a-button class="w-[120px]" size="small">ta的关注/粉丝</a-button>
        </div>
      </div>
    </div>
    <div class="mt-5 rounded-2xl bg-white min-h-[500px] px-1 pb-5">
      <a-tabs centered size="small">
        <a-tab-pane key="1" tab="记录">
          <component v-if="userRecords.length == 0" :is="none('旅行记录')" />
          <div v-else class="grid grid-cols-2 gap-1.5">
            <travel-post-item v-for="r in userRecords" :key="r.id" :post="r" type="record" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="攻略">
          <component v-if="userGuides.length == 0" :is="none('旅行攻略')" />
          <div v-else class="grid grid-cols-2 gap-1.5">
            <travel-post-item v-for="r in userGuides" :key="r.id" :post="r" type="guide" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="h-[50px]" />
  </div>
</template>

<style scoped>
.user-info-box-bg {
  content: "";
  background-size: contain;

  filter: blur(40px) brightness(0.6);
}
</style>

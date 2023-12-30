<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import { DefaultTravelGuide } from "@/services/default.ts"
import { GetTravelGuide, GetUserAvatarUrl } from "@/services/api.ts"
import HeartIcon from "@/components/guide/HeartIcon.vue"
import dayjs from "dayjs"
import TravelGuide = Model.TravelGuide

const route = useRoute()
const router = useRouter()
const guideId = computed(() => route.params["id"])

const guide = ref<TravelGuide>(DefaultTravelGuide)
guide.value = await GetTravelGuide(<string>guideId.value)
</script>

<template>
  <div>
    <page-header title="旅行攻略" />
    <guide-image-gallery :image-list="guide.images ?? []" />
    <div class="bg-white p-3 rounded-b-2xl">
      <div class="text-xl font-[SmileySans]">{{ guide.title }}</div>
      <div class="text-[0.9em] mt-3 font-normal" v-html="guide.content"></div>
      <div v-if="guide.author" class="mt-3 flex gap-2 items-center">
        <div>
          <img :src="GetUserAvatarUrl(guide.author.id)" alt="" class="h-[30px] w-[30px] rounded-full overflow-clip" />
        </div>
        <div class="text-[0.9em] font-semibold">{{ guide.author!.name }}</div>
      </div>
      <div class="text-xs text-gray-500 mt-3">{{ dayjs(guide.publishTime).format("LL HH:mm") }}</div>
      <a-divider />
      <div class="mx-2">
        <a-button block size="small" type="dashed">
          <i class="fa-solid fa-plus mx-1"></i>
          发表新评论
        </a-button>
      </div>
      <div class="m-2 mt-4 flex flex-col gap-3">
        <comment-component v-for="c in guide.comments" :key="c.id" :data="c" />
      </div>
    </div>

    <div class="h-[70px]"></div>
    <div class="fixed bottom-2 mt-3 h-[50px] border border-black/10 rounded-2xl bg-white/80 backdrop-blur">
      <div class="flex gap-5 h-full py-2 px-4 items-center">
        <div class="flex gap-1 items-center">
          <heart-icon />
          <span class="font-bold text-sm">{{ guide.like }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <i class="fa-regular fa-star fa-xl"></i>
          <span class="font-bold text-sm">{{ guide.favorites }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

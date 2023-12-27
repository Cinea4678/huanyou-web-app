<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import { DefaultTravelGuide } from "@/services/default.ts"
import TravelGuide = Model.TravelGuide
import { GetTravelGuide } from "@/services/api.ts"
import HeartIcon from "@/components/guide/HeartIcon.vue"
import dayjs from "dayjs"

const route = useRoute()
const router = useRouter()
const guideId = computed(() => route.params["id"])

const guide = ref<TravelGuide>(DefaultTravelGuide)
guide.value = await GetTravelGuide(<string>guideId.value)
</script>

<template>
  <div>
    <page-header title="旅行攻略" />
    <guide-image-gallery :image-list="guide.images" />
    <div class="bg-white p-3 rounded-b-2xl">
      <div class="text-xl font-[SmileySans]">{{ guide.title }}</div>
      <div class="text-[0.9em] mt-3 font-normal" v-html="guide.content"></div>
      <div class="text-xs text-gray-500 mt-3">{{ dayjs(guide.publishTime).format("LL HH:mm") }}</div>
      <el-divider />
      <div class="m-2 flex flex-col gap-3">
        <comment-component v-for="c in guide.comments" :key="c.id" :data="c" />
      </div>
    </div>

    <div class="h-[70px]"></div>
    <div class="fixed bottom-2 mt-3 h-[50px] border border-black/10 rounded-2xl bg-white/80 backdrop-blur">
      <div class="flex gap-5 h-full py-2 px-4 items-center">
        <div class="flex gap-1 items-center">
          <heart-icon />
          <span class="font-bold text-sm">32</span>
        </div>
        <div class="flex gap-1 items-center">
          <i class="fa-regular fa-comment-dots fa-xl"></i>
          <span class="font-bold text-sm">156</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import { GetTravelGuide, GetTravelRecord, GetUserAvatarUrl } from "@/services/api.ts"
import HeartIcon from "@/components/guide/HeartIcon.vue"
import dayjs from "dayjs"

const route = useRoute()
const router = useRouter()
const guideId = computed(() => route.params["id"])

const record = ref<Model.TravelRecord>({ id: 0 })
record.value = await GetTravelRecord(<string>guideId.value)
</script>

<template>
  <div>
    <page-header title="旅行记录" />
    <guide-image-gallery :image-list="record.images ?? []" />
    <div class="bg-white p-3 rounded-b-2xl">
      <div class="text-xl font-[SmileySans]">{{ record.title }}</div>
      <div class="text-[0.9em] mt-3 font-normal" v-html="record.content"></div>
      <div v-if="record.author" class="mt-3 flex gap-2 items-center">
        <div>
          <img :src="GetUserAvatarUrl(record.author.id)" alt="" class="h-[30px] w-[30px] rounded-full overflow-clip" />
        </div>
        <div class="text-[0.9em] font-semibold">{{ record.author!.name }}</div>
      </div>
      <div class="text-xs text-gray-500 mt-3">{{ dayjs(record.publishTime).format("LL HH:mm") }}</div>
      <a-divider />
      <div class="mx-2">
        <a-button size="small" type="dashed" block>
          <i class="fa-solid fa-plus mx-1"></i>
          发表新评论
        </a-button>
      </div>
      <div v-if="record.comments?.length ?? 0 > 0" class="m-2 mt-4 flex flex-col gap-3">
        <comment-component v-for="c in record.comments" :key="c.id" :data="c" />
      </div>
      <div v-else class="m-2 mt-4">
        <a-empty description="没有评论" />
      </div>
    </div>

    <div class="h-[70px]"></div>
    <div class="fixed bottom-2 mt-3 py-1 border border-solid border-black/10 rounded-2xl bg-white/80 backdrop-blur">
      <div class="flex gap-5 h-full py-2 px-4 items-center">
        <div class="flex gap-1 items-center">
          <heart-icon />
          <span class="font-bold text-sm">{{ record.likes }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <i class="fa-regular fa-star fa-xl"></i>
          <span class="font-bold text-sm">{{ record.favorites }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

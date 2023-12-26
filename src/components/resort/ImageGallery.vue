<script setup lang="ts">
import { ref } from "vue"

import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"

defineProps<{
  imageList: string[]
}>()

const now = ref(0)
</script>

<template>
  <div class="w-[calc(100vw-var(--app-padx))]">
    <div class="image-container bg-white rounded-t-3xl overflow-clip">
      <!--      <img :src="imageList[now]" alt="" class="w-full h-full object-cover" />-->
      <swiper class="w-full h-full">
        <swiper-slide v-for="(img, i) in imageList" :key="i">
          <img :src="img" alt="" class="w-full h-full object-cover" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: calc(calc(100vw - var(--app-padx)) - 20px);
}
</style>

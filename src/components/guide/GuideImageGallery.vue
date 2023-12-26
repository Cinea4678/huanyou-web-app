<script lang="ts" setup>
import { ref, watch } from "vue"

import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { computedAsync } from "@vueuse/core"

const props = defineProps<{
  imageList: string[]
}>()

const imgContainer = ref<HTMLElement | null>(null)

const ratio = computedAsync(async () => {
  return new Promise<number>((resolve, reject) => {
    if (props.imageList.length > 0) {
      let image = new Image()
      image.onload = () => {
        resolve(image.height / image.width)
      }
      // 错误处理
      image.onerror = () => {
        reject(new Error("无法加载图像"))
      }
      image.src = props.imageList[0]
    } else {
      resolve(1.3)
    }
  })
}, 1.3)

const swiperInst = ref<InstanceType<typeof Swiper> | null>(null)
</script>

<template>
  <div class="w-[calc(100vw-var(--app-padx))]">
    <div ref="imgContainer" class="image-container relative bg-white rounded-t-3xl overflow-clip">
      <!--      <img :src="imageList[now]" alt="" class="w-full h-full object-cover" />-->
      <swiper ref="swiperInst" class="w-full h-full">
        <swiper-slide v-for="(img, i) in imageList" :key="i">
          <img :src="img" alt="" class="w-full h-full object-contain" />
        </swiper-slide>
      </swiper>
      <div class="absolute right-2 top-2"></div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: calc(calc(100vw - var(--app-padx)) * v-bind(ratio));
  min-height: calc(100vw - var(--app-padx));
}
</style>

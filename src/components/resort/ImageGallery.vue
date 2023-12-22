<script setup lang="ts">
import { ref } from "vue"

defineProps<{
  imageList: string[]
}>()

const now = ref(0)
</script>

<template>
  <div class="w-[calc(100vw-var(--app-padx))]">
    <div class="image-container bg-white rounded-t-3xl overflow-clip">
      <img :src="imageList[now]" alt="" class="w-full h-full object-cover" />
    </div>
    <div class="bg-gray-800 h-[70px] overflow-x-scroll">
      <div class="flex">
        <div
          v-for="(img, i) in imageList"
          :key="i"
          class="border-2 flex-shrink-0 h-[70px] w-[120px]"
          :style="now == i ? `border-color: rgb(234 179 8)` : `border-color: rgb(55 65 81)`"
          @click="now = i"
        >
          <img :src="img" alt="" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: calc(calc(100vw - var(--app-padx)) - 20px);
}
</style>

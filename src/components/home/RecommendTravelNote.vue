<script setup lang="ts">
import { GetUserAvatarUrl } from "@/services/api.ts"

interface Props {
  type?: "note" | "end"
  note?: Model.TravelRecord
}

withDefaults(defineProps<Props>(), { type: "note" })
const emits = defineEmits<{
  (e: "load"): void
}>()
</script>

<template>
  <div class="note-card">
    <div class="relative -mb-1">
      <img :src="note?.images![0]" alt="" class="w-full" @load="emits('load')" />
      <div class="absolute bottom-1 left-0 right-0 text-white px-3 pb-1" style="background: linear-gradient(to top, #00000055, transparent)">
        <div class="text-xs flex gap-1 items-center mt-1">
          <i class="fa-regular fa-thumbs-up" />
          {{ note?.likes }}
          <i class="fa-regular fa-star ml-3"></i>
          {{ note?.favorites }}
        </div>
      </div>
    </div>
    <div class="bg-white pt-1.5 pb-2 px-3 flex flex-col">
      <div class="font-bold text-sm">{{ note?.title }}</div>
      <!--      <div class="text-xs line-clamp-2" v-html="note?.content"></div>-->
      <div class="mt-1 flex gap-1 items-center">
        <img :src="GetUserAvatarUrl(note?.author?.id ?? 0)" alt="" class="h-[16px] w-[16px] object-contain rounded-full" />
        <div class="text-xs">{{ note?.author?.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  @apply rounded-lg overflow-clip;
  grid-row-start: auto;
  grid-row-end: span 180;
  margin-bottom: 10px;

  width: calc(calc(100vw - calc(var(--app-padx) + 18px)) / 2);
}
</style>

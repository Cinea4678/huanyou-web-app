<script setup lang="ts">
import TravelGuide = Model.TravelGuide

interface Props {
  type?: "guide" | "end"
  guide?: TravelGuide
}

withDefaults(defineProps<Props>(), { type: "guide" })
const emits = defineEmits<{
  (e: "load"): void
}>()
</script>

<template>
  <div class="note-card">
    <div v-if="type == 'guide'">
      <div class="relative">
        <img :src="guide?.images[0]" alt="" style="width: 100%" @load="emits('load')" />
        <div
          class="absolute bottom-0 left-0 right-0 text-white px-3 pb-1"
          style="background: linear-gradient(to top, #00000055, transparent)"
        >
          <div class="text-xs flex gap-1 items-center mt-1">
            <i class="fa-regular fa-thumbs-up" />
            {{ guide?.like }}
          </div>
        </div>
      </div>
      <div class="bg-white pt-1.5 pb-2 px-3 flex flex-col">
        <div class="font-bold text-sm">{{ guide?.title }}</div>
        <div class="text-xs line-clamp-2" v-html="guide?.content"></div>
      </div>
    </div>
    <div v-else-if="type == 'end'"></div>
  </div>
</template>

<style scoped>
.note-card {
  @apply rounded-lg flex flex-col overflow-clip;
  grid-row-start: auto;
  grid-row-end: span 180;
  margin-bottom: 10px;

  width: calc(calc(100vw - calc(var(--app-padx) + 18px)) / 2);
}
</style>

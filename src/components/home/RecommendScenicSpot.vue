<script setup lang="ts">
import { useRouter } from "vue-router"
import { computed } from "vue"

const props = defineProps<{
  scenic: Model.Resort
}>()

const router = useRouter()

const cover = computed(() => props.scenic.imageList![0] ?? "")

const jump = () => {
  router.push(`/resort/${props.scenic.id}`)
}
</script>

<template>
  <div class="card w-full h-full relative" @click="jump">
    <div class="card-top-info text-white px-3 py-1 flex flex-col">
      {{ scenic.name }}
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply rounded-xl;

  background: v-bind("`url('${cover}')`") center;
  background-size: cover;
  overflow: clip;
}

.card-top-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background: linear-gradient(to bottom, #00000055, transparent);
}
</style>

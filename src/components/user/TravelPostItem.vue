<script setup lang="ts">
defineProps<{
  post: Model.TravelGuide | Model.TravelRecord
  type: "guide" | "record"
}>()
</script>

<template>
  <div class="pb-2 w-full rounded shadow overflow-clip">
    <img :src="post.images![0]" alt="" class="h-[200px] w-full object-cover" />
    <div class="font-normal text-xs px-2 line-clamp-2">
      {{ post.title }}
    </div>
    <div class="px-2 text-xs mt-1">
      <i class="fa-regular fa-thumbs-up" />
      {{ post?.likes }}
      <i class="fa-regular fa-star ml-3"></i>
      {{ post?.favorites }}
    </div>
  </div>
</template>

<style scoped></style>

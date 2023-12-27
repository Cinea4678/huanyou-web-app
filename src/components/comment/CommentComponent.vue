<script setup lang="ts">
import Comment = Model.Comment
import dayjs from "dayjs"

defineProps<{
  data: Comment
}>()
</script>

<template>
  <div class="flex gap-3">
    <svg-icon name="User" size="25" class="shrink-0 mt-1" />
    <div class="flex flex-col shrink">
      <div class="font-normal text-sm">{{ data.author }}</div>
      <div class="text-xs">
        {{ data.content }}
        <span class="text-2xs text-gray-500">{{ dayjs(data.time).format("L LT") }}</span>
      </div>
    </div>
    <div class="grow" />
    <div class="text-gray-500 mt-2 shrink-0 flex items-center gap-1">
      <span class="text-xs">{{ data.likes > 0 ? data.likes : "" }}</span>
      <i class="fa-regular fa-heart"></i>
    </div>
  </div>
</template>

<style scoped></style>

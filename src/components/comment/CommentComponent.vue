<script setup lang="ts">
import Comment = Model.Comment
import dayjs from "dayjs"
import { GetUserAvatarUrl } from "@/services/api.ts"

defineProps<{
  data: Comment
}>()
</script>

<template>
  <div class="flex gap-2">
    <!--    <svg-icon name="User" size="25" class="shrink-0 mt-1" />-->
    <div class="shrink-0">
      <img :src="GetUserAvatarUrl(data.author?.id ?? 0)" alt="" class="w-[30px] h-[30px] rounded-full overflow-clip" />
    </div>
    <div class="flex flex-col shrink">
      <div class="font-normal text-sm">{{ data.author?.name }}</div>
      <div class="text-xs">
        {{ data.content }}
        <span class="text-2xs text-gray-500">{{ dayjs(data.time).format("L LT") }}</span>
      </div>
    </div>
    <div class="grow" />
    <div class="text-gray-500 mt-1 shrink-0 flex gap-1">
      <span class="text-xs">{{ data.likes ?? 0 > 0 ? data.likes : "" }}</span>
      <i class="fa-regular fa-heart"></i>
    </div>
  </div>
</template>

<style scoped></style>

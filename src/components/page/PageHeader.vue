<script setup lang="ts">
defineSlots<{
  title(): any
}>()

defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="h-[50px] flex gap-3 items-center">
    <i class="fa-solid fa-chevron-left"></i>
    <div class="grow" />
    <div class="font-normal">
      <slot name="title">
        <div>{{ title }}</div>
      </slot>
    </div>
    <div class="grow" />
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>
</template>

<style scoped></style>

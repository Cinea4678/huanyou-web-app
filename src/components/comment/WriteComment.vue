<script setup lang="ts">
import { ref } from "vue"

const emits = defineEmits<{
  (e: "update", content: string): void
}>()

const content = ref("")
</script>

<template>
  <a-textarea v-model:value="content" @change="emits('update', content)" />
</template>

<style scoped></style>

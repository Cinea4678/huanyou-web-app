<script setup lang="ts">
interface Props {
  active?: boolean
}

withDefaults(defineProps<Props>(), { active: false })
</script>

<template>
  <div>
    <i v-if="active" class="fa-solid fa-heart fa-xl text-red-500"></i>
    <i v-else class="fa-regular fa-heart fa-xl"></i>
  </div>
</template>

<style scoped></style>

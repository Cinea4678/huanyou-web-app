<script setup lang="ts">
import { useRoute } from "vue-router"
import { ref, computed } from "vue"
import Resort = Model.Resort

const route = useRoute()
const resortId = computed(() => route.params["id"])

const resort = ref<Resort | null>(null)
</script>

<template>
  <div>
    <page-header title="景区" />
    <div>12345678</div>
  </div>
</template>

<style scoped></style>

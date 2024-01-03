<script setup lang="ts">
import { onMounted, ref } from "vue"
import { GetFavorites } from "@/services/api.ts"

const props = defineProps<{
  favoritesId: string
}>()

const emits = defineEmits<{
  (e: "goto", url: string): void
}>()

const favorites = ref<Model.Favorites | null>(null)

const gotoRecords = (id: number) => {
  emits("goto", `/record/${id}`)
}
const gotoGuides = (id: number) => {
  emits("goto", `/guide/${id}`)
}

onMounted(async () => {
  favorites.value = await GetFavorites(props.favoritesId)
})
</script>

<template>
  <div>收藏的旅行攻略（{{ favorites?.itemGuides?.length ?? 0 }}）</div>
  <a-list v-if="favorites">
    <a-list-item v-for="p in favorites.itemGuides" :key="p.id">
      <div @click="gotoGuides(p.id)">{{ p.title }}</div>
    </a-list-item>
  </a-list>
  <div>收藏的旅行记录（{{ favorites?.itemRecords?.length ?? 0 }}）</div>
  <a-list v-if="favorites">
    <a-list-item v-for="p in favorites.itemRecords" :key="p.id">
      <div @click="gotoRecords(p.id)">{{ p.title }}</div>
    </a-list-item>
  </a-list>
</template>

<style scoped></style>

<script setup lang="ts">
import { computed, h, onMounted, ref } from "vue"
import { CancelFavoritesGuide, CancelFavoritesRecord, GetFavorites } from "@/services/api.ts"
import { Modal } from "ant-design-vue"

const props = defineProps<{
  favoritesId: string
  userId?: string
}>()

const emits = defineEmits<{
  (e: "goto", url: string): void
}>()

const favorites = ref<Model.Favorites | null>(null)
const editing = ref(false)

const canEdit = computed(() => props.userId ?? 0 == favorites.value?.owner?.id)

const gotoRecords = (id: number) => {
  emits("goto", `/record/${id}`)
}
const gotoGuides = (id: number) => {
  emits("goto", `/guide/${id}`)
}

const removeFavorite = (id: number, type: "guide" | "record") => {
  Modal.confirm({
    title: "你确定要删除这项收藏吗",
    async onOk() {
      if (type == "guide") {
        await CancelFavoritesGuide(id.toString(), favorites.value?.id.toString() ?? "")
      } else {
        await CancelFavoritesRecord(id.toString(), favorites.value?.id.toString() ?? "")
      }
      favorites.value = await GetFavorites(props.favoritesId)
    },
  })
}

onMounted(async () => {
  favorites.value = await GetFavorites(props.favoritesId)
})
</script>

<template>
  <div class="flex">
    收藏的旅行攻略（{{ favorites?.itemGuides?.length ?? 0 }}）
    <div class="grow" />
    <div v-if="canEdit" class="flex items-center gap-1.5">
      编辑
      <a-switch v-model:checked="editing" size="small" />
    </div>
  </div>
  <a-list v-if="favorites">
    <a-list-item v-for="p in favorites.itemGuides" :key="p.id" class="flex">
      <div @click="gotoGuides(p.id)">{{ p.title }}</div>
      <div class="grow" />
      <a-button v-if="editing" size="small" :icon="h('i', { class: 'fa-solid fa-xmark' })" class="shrink-0" @click="removeFavorite(p.id, 'guide')" />
    </a-list-item>
  </a-list>
  <div>收藏的旅行记录（{{ favorites?.itemRecords?.length ?? 0 }}）</div>
  <a-list v-if="favorites">
    <a-list-item v-for="p in favorites.itemRecords" :key="p.id" class="flex" style="padding-left: 10px !important">
      <div @click="gotoRecords(p.id)">{{ p.title }}</div>
      <div class="grow min-w-[10px]" />
      <a-button v-if="editing" size="small" :icon="h('i', { class: 'fa-solid fa-xmark' })" class="shrink-0" @click="removeFavorite(p.id, 'record')" />
    </a-list-item>
  </a-list>
</template>

<style scoped></style>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { GetUserOwnedFavorites } from "@/services/api.ts"

const props = defineProps<{ curUserId: number }>()

const favorites = ref<Model.Favorites[]>([])

const emits = defineEmits<{
  (e: "choose", id: number): void
}>()

onMounted(async () => {
  favorites.value = await GetUserOwnedFavorites(props.curUserId.toString())
})
</script>

<template>
  <div>
    <favorites-list :data="favorites" name="我创建的收藏夹" @choose="(id) => emits('choose', id)" />
  </div>
</template>

<style scoped></style>

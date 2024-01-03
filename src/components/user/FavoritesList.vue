<script setup lang="ts">
const props = defineProps<{
  name: string
  data: Model.Favorites[]
}>()

const emits = defineEmits<{
  (e: "choose", id: number): void
}>()
</script>

<template>
  <div class="px-2">
    <div class="text-xs text-gray-500">{{ name }} ({{ data.length }})</div>
    <a-list :data-source="data" class="-mx-3">
      <template #renderItem="{ item }: { item: Model.Favorites }">
        <a-list-item @click="emits('choose', item.id)">
          <div class="flex items-center gap-3">
            <a-avatar>
              <template #icon><i class="fa-regular fa-bookmark"></i></template>
            </a-avatar>
            <div class="font-normal">{{ item.name }}</div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>

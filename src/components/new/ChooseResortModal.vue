<script lang="ts" setup>
import { h, onMounted, ref } from "vue"
import { ListResort } from "@/services/api.ts"

const emits = defineEmits<{
  (e: "choose", resort: Model.Resort): void
}>()

const resorts = ref<Model.Resort[]>([])

const choose = (resort: Model.Resort) => {
  emits("choose", resort)
}

onMounted(async () => {
  resorts.value = await ListResort()
})
</script>

<template>
  <div>
    <a-input placeholder="搜索景区" size="small"></a-input>
    <a-list class="max-h-[60vh] overflow-scroll" :data-source="resorts">
      <template #renderItem="{ item }: { item: Model.Resort }">
        <a-list-item>
          <a-list-item-meta>
            <template #avatar>
              <a-avatar :src="item.imageList![0]" />
            </template>
          </a-list-item-meta>
          <div class="grow">{{ item.name }}</div>
          <a-button :icon="h('i', { class: 'fa-solid fa-check' })" @click="choose(item)" size="small" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped></style>

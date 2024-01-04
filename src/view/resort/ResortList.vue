<script setup lang="ts">
import { ref } from "vue"
import { ListResort } from "@/services/api.ts"
import { useRouter } from "vue-router"

const router = useRouter()

const resortList = ref<Model.Resort[]>([])

resortList.value = await ListResort()

const gotoResort = (id: number) => {
  router.push(`/resort/${id}`)
}
</script>

<template>
  <page-header title="景区列表" />
  <a-card :bodyStyle="{ padding: '10px' }">
    <a-list :data-source="resortList">
      <template #renderItem="{ item }: { item: Model.Resort }">
        <a-list-item style="padding: 5px" @click="gotoResort(item.id)">
          <a-list-item-meta :title="item.name" :description="item.summary">
            <template #avatar>
              <img :src="item.imageList![0]" alt="" class="h-[64px] w-[64px] object-cover rounded" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<style scoped></style>

<script lang="ts" setup>
import { ref } from "vue"
import { ListGuides, ListRecords } from "@/services/api.ts"
import { VueFlexWaterfall } from "vue-flex-waterfall"
import { useRouter } from "vue-router"

const router = useRouter()
const records = ref<Model.TravelRecord[]>([])

const waterfall = ref<InstanceType<typeof VueFlexWaterfall> | null>(null)

records.value = await ListRecords()

const gotoRecord = (id: number) => {
  router.push(`/record/${id}`)
}
const reloadWaterFlow = () => {
  waterfall.value?.updateOrder()
}
</script>

<template>
  <page-header title="旅行记录" />
  <vue-flex-waterfall ref="waterfall" :col="2" :col-spacing="10">
    <recommend-travel-note v-for="n in records" :key="n.id" :note="n" type="note" @click="gotoRecord(n.id)" @load="reloadWaterFlow" />
  </vue-flex-waterfall>
</template>

<style scoped></style>

<script lang="ts" setup>
import { ref } from "vue"
import { ListGuides } from "@/services/api.ts"
import { VueFlexWaterfall } from "vue-flex-waterfall"
import { useRouter } from "vue-router"

const router = useRouter()
const guides = ref<Model.TravelGuide[]>([])

const waterfall = ref<InstanceType<typeof VueFlexWaterfall> | null>(null)

guides.value = await ListGuides()

const gotoGuide = (id: number) => {
  router.push(`/guide/${id}`)
}
const reloadWaterFlow = () => {
  waterfall.value?.updateOrder()
}
</script>

<template>
  <page-header title="旅行攻略" />
  <vue-flex-waterfall ref="waterfall" :col="2" :col-spacing="10">
    <recommend-travel-guide v-for="g in guides" :key="g.id" :guide="g" type="guide" @click="gotoGuide(g.id)" @load="reloadWaterFlow" />
  </vue-flex-waterfall>
</template>

<style scoped></style>

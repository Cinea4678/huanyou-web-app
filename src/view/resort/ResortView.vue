<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, computed, onMounted } from "vue"
import Resort = Model.Resort
import { GetResort, GetResortGuides } from "@/services/api.ts"
import { DefaultResort } from "@/services/default.ts"
import TravelGuide = Model.TravelGuide
import { VueFlexWaterfall } from "vue-flex-waterfall"
import RecommendTravelNote from "@/components/home/RecommendTravelNote.vue"

const route = useRoute()
const router = useRouter()
const resortId = computed(() => route.params["id"])

const resort = ref<Resort>(DefaultResort)
const waterfall = ref<InstanceType<typeof VueFlexWaterfall> | null>(null)

resort.value = await GetResort(resortId.value)

const recommendGuides = ref<TravelGuide[]>([])

onMounted(() => {
  GetResortGuides(<string>resortId.value).then((res) => (recommendGuides.value = res))
})

const reloadWaterFlow = () => {
  waterfall.value?.updateOrder()
}

const gotoNavi = () => {
  router.push(`/navi/${resortId.value}`)
}
</script>

<template>
  <div>
    <page-header title="景区" />
    <image-gallery :image-list="resort.imageList" />
    <div class="bg-white pt-2 pb-4 px-3 rounded-b-2xl">
      <div class="font-bold text-xl">{{ resort.name }}</div>
      <div class="mt-0.5 font-normal text-sm text-gray-400">{{ resort.summary }}</div>
      <small-map v-if="resort.address != ''" class="mt-3 drop-shadow" :loc="resort.address" @click="gotoNavi" />
      <div class="mt-3 font-normal text-sm text-gray-600">{{ resort.description }}</div>
    </div>
    <div class="mt-4">
      <vue-flex-waterfall ref="waterfall" :col="2" :col-spacing="10">
        <recommend-travel-guide
          v-for="g in recommendGuides"
          :key="g.id"
          :guide="g"
          type="guide"
          @load="reloadWaterFlow"
        />
      </vue-flex-waterfall>
    </div>
  </div>
</template>

<style scoped></style>

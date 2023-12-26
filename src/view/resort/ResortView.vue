<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { GetResort, GetResortGuides } from "@/services/api.ts"
import { DefaultResort } from "@/services/default.ts"
import { VueFlexWaterfall } from "vue-flex-waterfall"
import Resort = Model.Resort
import TravelGuide = Model.TravelGuide

const route = useRoute()
const router = useRouter()
const resortId = computed(() => route.params["id"])

const resort = ref<Resort>(DefaultResort)
const waterfall = ref<InstanceType<typeof VueFlexWaterfall> | null>(null)

resort.value = await GetResort(<string>resortId.value)

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
      <small-map v-if="resort.address != ''" :loc="resort.address" class="mt-3 drop-shadow" @click="gotoNavi" />
      <div class="mt-3 font-normal text-sm text-gray-600">{{ resort.description }}</div>
    </div>
    <div class="mt-4">
      <div class="sub-title">精选旅行攻略</div>
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

<style scoped>
.sub-title {
  @apply font-[SmileySans] text-xl;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-image: linear-gradient(to bottom, #788c65, #96af7f);
}
</style>

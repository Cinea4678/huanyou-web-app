<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { DefaultReGeoEncoding, DefaultResort } from "@/services/default.ts"
import { GetRegeoEncode, GetResort } from "@/services/api.ts"
import AMapLoader from "@amap/amap-jsapi-loader"
import { Position } from "@element-plus/icons-vue"

import Resort = Model.Resort

const route = useRoute()
const resortId = computed(() => route.params["id"])

const resort = ref<Resort>(DefaultResort)

const map = ref<HTMLElement | null>(null)
let mapInstance

const reGeoData = ref(DefaultReGeoEncoding)

const fetchReGeoData = async () => {
  if (!resort.value.address) {
    return
  }
  reGeoData.value = await GetRegeoEncode(resort.value.address, "风景名胜", 1000, "base")
}

resort.value = await GetResort(<string>resortId.value)
await fetchReGeoData()

let [lon, lan] = resort.value.address?.split(",").map(Number) ?? [0, 0]

let AMap: any

AMapLoader.load({
  key: "a0a055d03dded14b86a53fdb2dc67523",
  version: "2.0",
  plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ControlBar", "AMap.MouseTool", "AMap.PlaceSearch"],
}).then((AMap_) => {
  AMap = AMap_
  mapInstance = new AMap.Map(map.value, {
    viewMode: "3D",
    zoom: 11,
    center: [lon, lan],
  })
})

// 在高德地图中打开
const jump = () => {
  if (!resort.value.address) {
    return
  }
  let [lon, lan] = resort.value.address.split(",").map(Number)

  new AMap.PlaceSearch().poiOnAMAP({
    name: resort.value.name,
    location: [lon, lan],
  })
}
</script>

<template>
  <div>
    <page-header title="景区导航" />
    <div class="w-[calc(100vw-var(--app-padx))] drop-shadow">
      <div class="w-full h-[calc(100vh-350px)] rounded-t-2xl overflow-clip border-b-0 border border-black/10">
        <div ref="map" class="w-full h-full" />
      </div>
      <div class="relative h-[140px] bg-white rounded-b-2xl border-t-0 border border-black/10 py-2 px-3">
        <div class="text-xl font-bold">{{ resort.name }}</div>
        <div class="text-sm font-normal text-gray-400">{{ reGeoData.regeocode.formatted_address }}</div>
        <div class="absolute bottom-5 right-5">
          <div class="h-[50px] w-[50px] rounded-full bg-blue-500 drop-shadow-lg flex justify-center items-center" @click="jump">
            <i class="fa-solid fa-location-arrow fa-xl" style="color: #ffffff"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

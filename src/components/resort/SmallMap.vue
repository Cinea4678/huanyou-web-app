<script lang="ts" setup>
import { GetRegeoEncode, GetStaticMapUrl } from "@/services/api.ts"
import { computed, onMounted, ref, watch } from "vue"
import { DefaultReGeoEncoding } from "@/services/default.ts"

let props = defineProps<{
  loc: string
}>()

// 将地图向东移动一定的距离来配合其他组件显示
const locOffset = computed(() => {
  let [lon, lat] = props.loc.split(",")
  lon = String(Number(lon) - 0.035)
  return [lon, lat].join(",")
})

const reGeoData = ref(DefaultReGeoEncoding)

const fetchReGeoData = async () => {
  reGeoData.value = await GetRegeoEncode(props.loc, "风景名胜", 1000, "base")
}

const city = computed(() => {
  let c = reGeoData.value.regeocode.addressComponent.city
  if (c instanceof Array) {
    return c[0] ?? ""
  } else {
    return c
  }
})

onMounted(() => {
  fetchReGeoData()
})

watch(props, () => {
  fetchReGeoData()
})
</script>

<template>
  <div class="relative h-[70px] rounded-2xl overflow-clip border border-solid border-black/20">
    <img alt="" :src="GetStaticMapUrl(locOffset, '11', '600*100', `mid,0x008000,:${loc}`)" class="h-full w-full object-cover" />
    <div class="absolute top-0 bottom-0 left-0 w-[70%]" style="background: linear-gradient(to right, #ffffffff 40%, #ffffff00)">
      <div v-if="reGeoData.status == '1'" class="pt-3 pl-3 flex gap-2.5 items-center">
        <svg-icon name="Location" size="1.5em" />
        <div>
          <div class="text-sm font-bold">
            {{ reGeoData.regeocode.addressComponent.province }}
            {{ city }}
            {{ reGeoData.regeocode.addressComponent.district }}
          </div>
          <div class="mt-1 text-xs text-gray-400">查看地图 / 导航 ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

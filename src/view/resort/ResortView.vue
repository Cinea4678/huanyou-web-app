<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, computed, onMounted } from "vue"
import Resort = Model.Resort
import { GetResort } from "@/services/api.ts"
import { DefaultResort } from "@/services/default.ts"

const route = useRoute()
const router = useRouter()
const resortId = computed(() => route.params["id"])

const resort = ref<Resort>(DefaultResort)

onMounted(async () => {
  resort.value = await GetResort(resortId.value)
})

const gotoNavi = () => {
  router.push(`/navi/${resortId.value}`)
}
</script>

<template>
  <div>
    <page-header title="景区" />
    <image-gallery :image-list="resort.imageList" />
    <div class="h-[300px] bg-white py-2 px-3">
      <div class="font-bold text-xl">{{ resort.name }}</div>
      <div class="mt-0.5 font-light text-sm text-gray-400">{{ resort.summary }}</div>
      <small-map v-if="resort.address != ''" class="mt-3" :loc="resort.address" @click="gotoNavi" />
    </div>
  </div>
</template>

<style scoped></style>

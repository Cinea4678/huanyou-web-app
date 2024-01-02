<script setup lang="ts">
import { VueFlexWaterfall } from "vue-flex-waterfall"
import { Search } from "@element-plus/icons-vue"
import { computed, onMounted, ref } from "vue"
import { GetHomeRecommendResort, GetHomeRecommendTravelNotes } from "@/services/api.ts"

import HomeRecommend = API.HomeRecommend
import RecommendTravelNote from "@/components/home/RecommendTravelNote.vue"
import { useStore } from "@/utils/store.ts"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const loggedIn = computed(() => store.state.loggedIn)

const waterfall = ref<InstanceType<typeof VueFlexWaterfall> | null>(null)

const homeRecommendScenicSpot = ref<Model.Resort[]>([])
const homeRecommendTravelNotes = ref<Model.TravelRecord[]>([])
onMounted(() => {
  GetHomeRecommendResort().then((res) => (homeRecommendScenicSpot.value = res))
  GetHomeRecommendTravelNotes().then((res) => (homeRecommendTravelNotes.value = res))
})

const reloadWaterFlow = () => {
  waterfall.value?.updateOrder()
}

const gotoPersonalCenter = () => {
  if (!loggedIn.value) {
    router.push("/login").then()
  }
}

const gotoNote = (id: number) => {
  router.push(`/record/${id}`)
}
</script>

<template>
  <div class="h-[50px] flex items-center gap-5 font-normal text-lg app-top">
    <div class="grow" />
    <div>首页</div>
    <div>景点</div>
    <div>攻略</div>
    <div class="grow" />
  </div>
  <div class="px-1 app-post-top flex flex-col gap-3">
    <a-input size="large" placeholder="搜索景点" :suffix-icon="Search" />
    <a-carousel>
      <div v-for="(item, index) in homeRecommendScenicSpot" :key="index" class="h-[200px]">
        <recommend-scenic-spot :scenic="item" />
      </div>
    </a-carousel>
  </div>
  <div class="button-card">
    <category-button title="景点景区" icon="ScenicSpot" />
    <category-button title="旅行记录" icon="TravelNote" />
    <category-button title="旅行攻略" icon="TravelGuide" />
    <category-button :title="loggedIn ? '个人中心' : '登录注册'" icon="PersonalCenter" @click="gotoPersonalCenter" />
  </div>
  <div class="mt-4 mx-1">
    <vue-flex-waterfall ref="waterfall" :col="2" :col-spacing="10">
      <recommend-travel-note v-for="d in homeRecommendTravelNotes" :key="d.id" :note="d" type="note" @load="reloadWaterFlow" @click="gotoNote(d.id)" />
    </vue-flex-waterfall>
  </div>
  <a-float-button type="primary">
    <template #icon> <i class="fa-solid fa-pencil"></i> </template>
  </a-float-button>
</template>

<style scoped>
.app-top {
  /*background: linear-gradient(to bottom, #0066cc 0, #0066cc 70%, #0066cc00);*/
  color: black;
}
.button-card {
  @apply mt-4 mx-1 grid grid-cols-4 bg-white rounded-lg;
}
</style>

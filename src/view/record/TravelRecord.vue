<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { computed, h, ref } from "vue"
import { CancelLikeRecord, DeleteRecord, FavoritesRecord, GetTravelRecord, GetUserAvatarUrl, LikeRecord } from "@/services/api.ts"
import HeartIcon from "@/components/guide/HeartIcon.vue"
import dayjs from "dayjs"
import { store, useStore } from "@/utils/store.ts"
import ChooseFavoritesModal from "@/components/guide/ChooseFavoritesModal.vue"
import { message, Modal } from "ant-design-vue"
import { Delete } from "@element-plus/icons-vue"

const store = useStore()
const route = useRoute()
const router = useRouter()
const guideId = computed(() => route.params["id"])

const record = ref<Model.TravelRecord>({ id: 0 })
const liked = ref((record.value?.likedUser?.findIndex((v) => v.id == store.state.user?.id) ?? -1) >= 0)

const canEdit = computed(() => store.state.user?.id == record.value.author?.id)

record.value = await GetTravelRecord(<string>guideId.value)

const handleLikeToggle = () => {
  if (!liked.value) {
    LikeRecord(record.value.id.toString())
    liked.value = true
    if (record.value.likes) {
      record.value.likes++
    }
  } else {
    CancelLikeRecord(record.value.id.toString())
    liked.value = false
    if (record.value.likes) {
      record.value.likes--
    }
  }
}

const handleFavorite = () => {
  let modal = Modal.info({
    title: "选择收藏夹",
    content: h(ChooseFavoritesModal, {
      curUserId: store.state.user.id,
      async onChoose(id: number) {
        await FavoritesRecord(record.value.id.toString(), id.toString())
        message.success("成功").then()
        modal.destroy()
      },
    }),
  })
}

const handleDelete = () => {
  Modal.confirm({
    title: "确认要删除吗",
    content: "删除后将无法恢复",
    async onOk() {
      await DeleteRecord(record.value.id.toString())
      router.push("/").then()
    },
  })
}
</script>

<template>
  <div>
    <page-header title="旅行记录" />
    <guide-image-gallery :image-list="record.images ?? []" />
    <div class="bg-white p-3 rounded-b-2xl">
      <div class="text-xl font-[SmileySans]">{{ record.title }}</div>
      <div class="text-[0.9em] mt-3 font-normal" v-html="record.content"></div>
      <div v-if="record.author" class="mt-3 flex gap-2 items-center">
        <div>
          <img :src="GetUserAvatarUrl(record.author.id)" alt="" class="h-[30px] w-[30px] rounded-full overflow-clip" />
        </div>
        <div class="text-[0.9em] font-semibold">{{ record.author!.name }}</div>
      </div>
      <div class="text-xs text-gray-500 mt-3 flex gap-2">
        {{ dayjs(record.publishTime).format("LL HH:mm") }}
        <a v-if="canEdit" class="text-red-500" @click="handleDelete">删除</a>
      </div>

      <a-divider />

      <div class="mx-2">
        <a-button block size="small" type="dashed">
          <i class="fa-solid fa-plus mx-1"></i>
          发表新评论
        </a-button>
      </div>
      <div v-if="record.comments?.length ?? 0 > 0" class="m-2 mt-4 flex flex-col gap-3">
        <comment-component v-for="c in record.comments" :key="c.id" :data="c" />
      </div>
      <div v-else class="m-2 mt-4">
        <a-empty description="没有评论" />
      </div>
    </div>

    <div class="h-[70px]"></div>
    <div class="fixed bottom-2 mt-3 py-1 border border-solid border-black/10 rounded-2xl bg-white/80 backdrop-blur">
      <div class="flex gap-5 h-full py-2 px-4 items-center">
        <div class="flex gap-1 items-center">
          <heart-icon :active="liked" @click="handleLikeToggle" />
          <span class="font-bold text-sm">{{ record.likes }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <div @click="handleFavorite"><i class="fa-regular fa-star fa-xl"></i></div>
          <span class="font-bold text-sm">{{ record.favorites }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

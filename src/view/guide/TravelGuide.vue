<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { computed, h, ref } from "vue"
import { DefaultTravelGuide } from "@/services/default.ts"
import { CancelLikeGuide, DeleteGuide, FavoritesGuide, GetTravelGuide, GetUserAvatarUrl, LikeGuide, SendComment } from "@/services/api.ts"
import HeartIcon from "@/components/guide/HeartIcon.vue"
import dayjs from "dayjs"
import TravelGuide = Model.TravelGuide
import { store } from "@/utils/store.ts"
import { message, Modal } from "ant-design-vue"
import ChooseFavoritesModal from "@/components/guide/ChooseFavoritesModal.vue"
import WriteComment from "@/components/comment/WriteComment.vue"

const route = useRoute()
const router = useRouter()
const guideId = computed(() => route.params["id"])

const guide = ref<TravelGuide>(DefaultTravelGuide)

const liked = ref((guide.value?.likedUser?.findIndex((v) => v.id == store.state.user?.id) ?? -1) >= 0)
const canEdit = computed(() => store.state.user?.id == guide.value.author?.id)

guide.value = await GetTravelGuide(<string>guideId.value)

const handleLikeToggle = () => {
  if (!liked.value) {
    LikeGuide(guide.value.id.toString())
    liked.value = true
    if (guide.value.likes) {
      guide.value.likes++
    }
  } else {
    CancelLikeGuide(guide.value.id.toString())
    liked.value = false
    if (guide.value.likes) {
      guide.value.likes--
    }
  }
}

const handleFavorite = () => {
  let modal = Modal.info({
    title: "选择收藏夹",
    content: h(ChooseFavoritesModal, {
      curUserId: store.state.user.id,
      async onChoose(id: number) {
        await FavoritesGuide(guide.value.id.toString(), id.toString())
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
      await DeleteGuide(guide.value.id.toString())
      router.push("/").then()
    },
  })
}

const handleNewComment = () => {
  if (!store.state.loggedIn) {
    message.warn("请先登录后再评论").then()
    router.push("/login")
  }

  let comment = ""
  let modal = Modal.info({
    title: "撰写新评论",
    content: h(WriteComment, {
      onUpdate(c: string) {
        comment = c
      },
    }),
    okText: "发送",
    async onOk() {
      if (comment.length == 0) {
        message.warn("不能发送空评论")
        throw new Error("Invalid Comment")
      }

      let commentObject = { author: { id: store.state.user?.id ?? 0 }, content: comment, id: 0 } satisfies Model.Comment

      await SendComment(commentObject, record.value.id, false)
      message.success("发送成功")
      location.reload()
      modal.destroy()
    },
  })
}
</script>

<template>
  <div>
    <page-header title="旅行攻略" />
    <guide-image-gallery :image-list="guide.images ?? []" />
    <div class="bg-white p-3 rounded-b-2xl">
      <div class="text-xl font-[SmileySans]">{{ guide.title }}</div>
      <div class="text-[0.9em] mt-3 font-normal" v-html="guide.content"></div>
      <div v-if="guide.author" class="mt-3 flex gap-2 items-center">
        <div>
          <img :src="GetUserAvatarUrl(guide.author.id)" alt="" class="h-[30px] w-[30px] rounded-full overflow-clip" />
        </div>
        <div class="text-[0.9em] font-semibold">{{ guide.author!.name }}</div>
      </div>
      <div class="text-xs text-gray-500 mt-3 flex gap-2">
        {{ dayjs(guide.publishTime).format("LL HH:mm") }}
        <a v-if="canEdit" class="text-red-500" @click="handleDelete">删除</a>
      </div>

      <a-divider />

      <div class="mx-2">
        <a-button block size="small" type="dashed" @click="handleNewComment">
          <i class="fa-solid fa-plus mx-1"></i>
          发表新评论
        </a-button>
      </div>
      <div class="m-2 mt-4 flex flex-col gap-3">
        <comment-component v-for="c in guide.comments" :key="c.id" :data="c" />
      </div>
    </div>

    <div class="h-[70px]"></div>
    <div class="fixed bottom-2 mt-3 py-1 border border-solid border-black/10 rounded-2xl bg-white/80 backdrop-blur">
      <div class="flex gap-5 h-full py-2 px-4 items-center">
        <div class="flex gap-1 items-center">
          <heart-icon :active="liked" @click="handleLikeToggle" />
          <span class="font-bold text-sm">{{ guide.likes }}</span>
        </div>
        <div class="flex gap-1 items-center">
          <div @click="handleFavorite"><i class="fa-regular fa-star fa-xl"></i></div>
          <span class="font-bold text-sm">{{ guide.favorites }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

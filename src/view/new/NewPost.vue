<script lang="ts" setup>
import { h, onMounted, reactive, ref } from "vue"
import { SegmentedOption } from "ant-design-vue/es/segmented/src/segmented"
import { message, Modal, UploadProps } from "ant-design-vue"
import ChooseResortModal from "@/components/new/ChooseResortModal.vue"

const mode = ref<"record" | "guide">("record")
const post = ref<Model.TravelGuide>({ id: 0 })
const chosenResort = ref<Model.Resort | null>(null)
const fileList = ref<UploadProps["fileList"]>([])

const option = reactive<SegmentedOption[]>([
  { value: "record", label: "旅行记录" },
  { value: "guide", label: "旅行攻略" },
])

const selectResort = () => {
  let modal = Modal.info({
    title: "选择关联景区",
    content: h(ChooseResortModal, {
      onChoose(resort: Model.Resort) {
        chosenResort.value = resort
        modal.destroy()
      },
    }),
  })
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handleImagePreview = async (file: UploadProps["fileList"][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }
  let url = file.response.data

  Modal.info({
    title: "预览图片",
    content: h(
      "div",
      {
        style: "display: flex; justify-items: center;",
      },
      [
        h("img", {
          src: url,
          style: "width: 50vw; object-fit: contain",
          alt: "Preview",
        }),
      ],
    ),
  })
}

const handleSend = async () => {
  if (mode.value == "guide") {
    if (chosenResort.value == null) {
      message.warn("请选择关联的景区")
      return
    } else {
      post.value.resort = { id: chosenResort.value!.id }
    }
  }

  if (post.value.title == null || post.value.title == "" || post.value.content == null || post.value.content == "") {
    message.warn("标题和内容不能为空")
    return
  }

  post.value.images = fileList.value.map((v) => v.response.data)
}

onMounted(() => {})
</script>

<template>
  <page-header title="分享新帖子" />
  <div class="mt-2 flex justify-center">
    <a-segmented v-model:value="mode" :options="option" />
  </div>
  <div v-if="mode == 'guide'" class="mt-2">
    <a-card @click="selectResort">
      <i class="fa-solid fa-location-dot"></i> 关联景区：
      <span v-if="chosenResort == null">未选择 <a>立即选择</a></span>
      <span v-else>{{ chosenResort.name }} <a>重新选择</a></span>
    </a-card>
  </div>
  <a-card class="mt-2">
    <a-input v-model:value="post.title" :bordered="false" placeholder="标题" size="large"></a-input>
  </a-card>
  <a-card class="mt-2">
    <a-textarea v-model:value="post.content" :auto-size="{ minRows: 5 }" :bordered="false" placeholder="内容" size="large" />
  </a-card>
  <a-card class="mt-2">
    <a-upload v-model:file-list="fileList" action="/api/upload/image" list-type="picture-card" @preview="handleImagePreview">
      <div v-if="fileList.length < 8">
        <i class="fa-solid fa-plus fa-xl mr-1" />
        <div style="margin-top: 8px">添加图片</div>
      </div>
    </a-upload>
  </a-card>
  <div class="mt-3">
    <a-button size="large" type="primary" class="w-full" @click="handleSend">发送</a-button>
  </div>
</template>

<style scoped>
a {
  @apply text-green-600;
}
</style>

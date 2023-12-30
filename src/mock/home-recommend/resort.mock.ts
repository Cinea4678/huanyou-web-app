import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/home-recommend/resort",
  body() {
    return mockApiResp<API.HomeRecommend.Resort[]>([
      { id: "1", description: "杭州市 - 西湖", imageUrl: "/mock/west-lake.jpg" },
      { id: "1", description: "上海市 - 外滩", imageUrl: "/mock/shanghai-bund.jpg" },
      { id: "1", description: "北京市 - 天坛祈年殿", imageUrl: "/mock/temple-of-heaven.jpg" },
    ])
  },
})

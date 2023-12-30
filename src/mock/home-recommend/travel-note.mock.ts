import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/home-recommend/travel-note",
  body() {
    return mockApiResp<API.HomeRecommend.TravelRecord[]>([
      {
        id: 1,
        coverUrl: "/mock/mock-note-1.jpg",
        title: "去了10次外滩才知道应该去北外滩……",
        description: "外滩人山人海 北外滩空无一人 citywalk不要太舒服",
        likes: 924,
        favorites: 647,
      },
      {
        id: 2,
        coverUrl: "/mock/mock-note-2.jpg",
        title: "西湖美得不顾我死活",
        description: "12.1摄于 花港观鱼、三潭印月、苏堤春晓、绿水芙蕖",
        likes: 4039,
        favorites: 1302,
      },
      {
        id: 3,
        coverUrl: "/mock/mock-note-3.jpg",
        title: "花60块钱在西湖的船上躺了一小时",
        description: "最近天气巨好，60块钱一小时的花港观鱼自划船真太值得了！",
        likes: 1976,
        favorites: 747,
      },
      {
        id: 4,
        coverUrl: "/mock/mock-note-4.jpg",
        title: "上海压马路/新天地十一月的街道太美啦！",
        description: "再次降温前难得的几天，体感温度超舒服，找不到工作的时候其实可以偶尔停一下出门走走的",
        likes: 29,
        favorites: 17,
      },
    ])
  },
})

import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/record",
  body() {
    return mockApiResp<Model.TravelRecord>({
      author: {
        id: 7,
        name: "Chinook",
      },
      comments: [],
      content: `
      12.1摄于 花港观鱼、三潭印月、苏堤春晓、绿水芙渠<br><br>风花雪月不肯等人<br><br>
      `,
      favorites: 1493,
      id: 1,
      images: Array.from({ length: 9 }, (_, i) => `https://s.c.accr.cc/huanyou/mock-note-view-${i + 1}.jpg`),
      like: 4478,
      likedUser: [],
      publishTime: "2023-12-02T12:31+08:00",
      title: "西湖美得不顾我死活",
    })
  },
})

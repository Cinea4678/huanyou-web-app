import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/resort",
  body() {
    return mockApiResp<Model.TravelGuide[]>([
      {
        author: {
          id: 2,
          name: "腊鸭腿✓",
        },
        comments: [],
        content: "<p>暴走一天2万步+，走完外西湖+里西湖！</p><p>路线：</p><p>酒店->钱王祠坐船->三潭映月</p>",
        id: 1,
        images: ["/mock/mock-guide-1.JPG"],
        like: 1525,
        publishTime: "2023-12-01T12:00:00",
        resort: <Model.Resort>{},
        title: "西湖一日游 | 里西湖+外西湖游览路线图",
      },
      {
        author: { id: 5 },
        comments: [],
        content: "<p>去了两次西湖，基本景点都走了一个遍，筛选了一些Zui值得去的景点，总结出来。</p>",
        id: 2,
        images: ["/mock/mock-guide-2.JPG"],
        like: 16322,
        publishTime: "2023-07-18T12:00:00",
        resort: <Model.Resort>{},
        title: "只需5步！杭州西湖最新游玩攻略！纯经验无广",
      },
      {
        author: { id: 6 },
        comments: [],
        content:
          "<p>西湖和灵隐寺为什么总那么多人？因为杭州本地人也爱得深沉。我在杭州第十一年，依然看不厌山水四季。</p>",
        id: 3,
        images: ["/mock/mock-guide-3.JPG"],
        like: 6394,
        publishTime: "2023-05-14T12:00:00",
        resort: <Model.Resort>{},
        title: "我有20条不踩雷杭州旅游路线，这是第一条。",
      },
      {
        author: { id: 7 },
        comments: [],
        content: "<p>西湖一圈全长大10多公里，可以路过将近20个景区，除了有的断桥、雷峰塔，还有很多好看的景点。</p>",
        id: 4,
        images: ["/mock/mock-guide-4.JPG"],
        like: 327,
        publishTime: "2023-05-14T12:00:00",
        resort: <Model.Resort>{},
        title: "不知道西湖怎么逛，1️⃣定要看这一篇",
      },
    ])
  },
})

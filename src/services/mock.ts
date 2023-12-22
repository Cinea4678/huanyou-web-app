import Mock from "mockjs"
import ApiResponse = Application.ApiResponse
import HomeRecommend = Application.HomeRecommend
import Resort = Model.Resort
import TravelGuide = Model.TravelGuide

function mockApiResp<T>(data: T): ApiResponse<T> {
  return { code: 10000, data: data, msg: "成功" }
}

Mock.mock(
  "/api/home-recommend/resort",
  "get",
  mockApiResp<HomeRecommend.Resort[]>([
    { id: "1", description: "杭州市 - 西湖", imageUrl: "/mock/west-lake.jpg" },
    { id: "1", description: "上海市 - 外滩", imageUrl: "/mock/shanghai-bund.jpg" },
    { id: "1", description: "北京市 - 天坛祈年殿", imageUrl: "/mock/temple-of-heaven.jpg" },
  ]),
)

Mock.mock(
  "/api/home-recommend/travel-note",
  "get",
  mockApiResp<HomeRecommend.TravelRecord[]>([
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
  ]),
)

Mock.mock(
  "/api/resort?id=1",
  "get",
  mockApiResp<Resort>({
    address: "120.156832,30.260652",
    collections: [],
    description:
      "西湖东靠杭州市区，其余三面环山，面积约6.39平方千米，南北长约3.2千米，东西宽约2.8千米，绕湖一周近15千米。西湖平均水深2.27米，水体容量约为1429万立方米。湖中被孤山、白堤、苏堤、杨公堤分隔，按面积大小分别为外西湖、西里湖（又称“后西湖”或“后湖”）、北里湖（又称“里西湖”）、小南湖（又称“南湖”）及岳湖等五片水面。",
    guideList: [],
    id: "1",
    imageList: ["/mock/west-lake-1.jpg", "/mock/west-lake.jpg", "/mock/west-lake-2.jpg", "/mock/west-lake-3.jpg"],
    likes: 1528,
    name: "西湖风景名胜区",
    region: "浙江省 杭州市",
    summary: "中国十大风景名胜之一，全国首批5A级景区，被列入世界遗产名录",
  }),
)

Mock.mock(
  "/api/guide/by-resort-id?id=1",
  "get",
  mockApiResp<TravelGuide[]>([
    {
      author: "999",
      comments: [],
      content: "<p>暴走一天2万步+，走完外西湖+里西湖！</p><p>路线：</p><p>酒店->钱王祠坐船->三潭映月</p>",
      id: "",
      images: ["/mock/mock-guide-1.JPG"],
      like: 1525,
      publishTime: "2023-12-01T12:00:00",
      resort: <Resort>{},
      status: "",
      title: "西湖一日游 | 里西湖+外西湖游览路线图",
    },
    {
      author: "999",
      comments: [],
      content: "<p>去了两次西湖，基本景点都走了一个遍，筛选了一些Zui值得去的景点，总结出来。</p>",
      id: "",
      images: ["/mock/mock-guide-2.JPG"],
      like: 16322,
      publishTime: "2023-07-18T12:00:00",
      resort: <Resort>{},
      status: "",
      title: "只需5步！杭州西湖最新游玩攻略！纯经验无广",
    },
    {
      author: "999",
      comments: [],
      content: "<p>西湖和灵隐寺为什么总那么多人？因为杭州本地人也爱得深沉。我在杭州第十一年，依然看不厌山水四季。</p>",
      id: "",
      images: ["/mock/mock-guide-3.JPG"],
      like: 6394,
      publishTime: "2023-05-14T12:00:00",
      resort: <Resort>{},
      status: "",
      title: "我有20条不踩雷杭州旅游路线，这是第一条。",
    },
    {
      author: "999",
      comments: [],
      content: "<p>西湖一圈全长大10多公里，可以路过将近20个景区，除了有的断桥、雷峰塔，还有很多好看的景点。</p>",
      id: "",
      images: ["/mock/mock-guide-4.JPG"],
      like: 327,
      publishTime: "2023-05-14T12:00:00",
      resort: <Resort>{},
      status: "",
      title: "不知道西湖怎么逛，1️⃣定要看这一篇",
    },
  ]),
)

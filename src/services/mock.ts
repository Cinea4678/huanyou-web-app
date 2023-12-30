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
    description:
      "西湖东靠杭州市区，其余三面环山，面积约6.39平方千米，南北长约3.2千米，东西宽约2.8千米，绕湖一周近15千米。西湖平均水深2.27米，水体容量约为1429万立方米。湖中被孤山、白堤、苏堤、杨公堤分隔，按面积大小分别为外西湖、西里湖（又称“后西湖”或“后湖”）、北里湖（又称“里西湖”）、小南湖（又称“南湖”）及岳湖等五片水面。",
    guideList: [],
    id: 1,
    imageList: ["/mock/west-lake-1.jpg", "/mock/west-lake.jpg", "/mock/west-lake-2.jpg", "/mock/west-lake-3.jpg"],
    likes: 1528,
    name: "西湖风景名胜区",
    summary: "中国十大风景名胜之一，全国首批5A级景区，被列入世界遗产名录",
  }),
)

Mock.mock(
  "/api/guide/by-resort-id?id=1",
  "get",
  mockApiResp<TravelGuide[]>([
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
      resort: <Resort>{},
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
      resort: <Resort>{},
      title: "只需5步！杭州西湖最新游玩攻略！纯经验无广",
    },
    {
      author: { id: 6 },
      comments: [],
      content: "<p>西湖和灵隐寺为什么总那么多人？因为杭州本地人也爱得深沉。我在杭州第十一年，依然看不厌山水四季。</p>",
      id: 3,
      images: ["/mock/mock-guide-3.JPG"],
      like: 6394,
      publishTime: "2023-05-14T12:00:00",
      resort: <Resort>{},
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
      resort: <Resort>{},
      title: "不知道西湖怎么逛，1️⃣定要看这一篇",
    },
  ]),
)

Mock.mock(
  "/api/guide?id=1",
  "get",
  mockApiResp<TravelGuide>({
    author: {
      id: 1,
      name: "不要浪费时间不开心",
    },
    comments: [
      {
        author: {
          id: 2,
          name: "腊鸭腿✓",
        },
        content: "这是单线航行的吗，不能原路返回对吗",
        id: 1,
        likes: 12,
        time: "2023-12-27T16:07:00Z",
      },
      {
        author: {
          id: 3,
          name: "墨缘",
        },
        content: "有酒店推荐吗",
        id: 2,
        likes: 0,
        time: "2023-12-19T12:00:00Z",
      },
      {
        author: {
          id: 4,
          name: "食不食栗",
        },
        content: "不能停靠呀",
        id: 3,
        likes: 0,
        time: "2023-12-09T12:00:00Z",
      },
    ],
    content: `
      <p>暴走一天2万步+，走完外西湖＋里西湖💪💪</p>
      <br/>
      <p>🌟路线：</p>
      <p>酒店➡️钱王祠坐船➡️三潭映月➡️花港观鱼码头➡️雷峰塔➡️太子湾➡️浴鹄湾➡️乌龟潭➡️茅家埠➡️曲院风荷4号门坐公交船
      ➡️花港观鱼码头➡️苏堤➡️西泠转角➡️孤山➡️平湖秋月➡️白堤➡️断桥残雪</p>
      <br/>
      <p>3️⃣三潭映月：</p>
      <p>在【钱王祠码头】买船票（🎫55元）到湖中小岛。一块钱的取景地。然后选择码头坐船去【花港观鱼】（一定要注意，岛上有几个码头，上船前要问清楚停靠在哪里）不用重新买票！</p>
      <br/>
      <p>4️⃣花港观鱼：</p>
      <p>按照规划的路线会有两次停靠在花港观鱼，可根据自己的需求停留，很多花和锦鲤。</p>
      <br/>
      <p>5️⃣雷峰塔：</p>
      <p>🎫40元 在坐船的路上或者去往【太子湾公园】的路上顺便拍一张就行，最佳拍照点是在净慈寺（🎫10元）</p>
      <br/>
      <p>6️⃣太子湾公园：</p>
      <p>去的时候是三月底，正好是郁金香🌷季节，在阳光下真的很美！</p>
      <br/>
      <p>7️⃣浴鹄湾8️⃣乌龟潭1️⃣0️⃣茅家埠（网红路线—里西湖路线）</p>
      <p>这条路线是我心中西湖最佳👍一路风景有种幽静的美🉑小溪、拱桥、霁虹桥、野鸭、白鹭、茅草屋、樱花……</p>
      <br/>
      <p>9️⃣曲院风荷</p>
      <p>赶三点半的末班游船，从【茅家埠】坐公交到【杭州花圃站】，从曲院风荷4号门进去到码头买票。</p>
      <br/>
      <p>1️⃣1️⃣回到花港观鱼</p>
      <p>曲院风荷🚢花港观鱼2站14元，在游船上感受西湖美景。</p>
      <br/>
      <p>1️⃣2️⃣苏堤暴走</p>
      <p>苏堤是我心中西湖美景第二名👍</p>
      <p>感受古代文人墨客笔下的杭州美</p>
      <p>“春水碧于天 画船听雨眠”</p>
      <p>“碧玉妆成一树高 万条垂下绿丝绦”</p>
      <p>“最爱湖东行不足 绿杨阴里白沙堤”</p>
      <p>“竹外桃花三两枝 春江水暖鸭先知”</p>
      <br/>
      <p>1️⃣3️⃣西泠桥</p>
      <p>最美转角，拍照打卡1314公交车🚌</p>
      <p>可能因为人太多，经过了也没看出来是具体哪里</p>
      <br/>
      <p>1️⃣5️⃣白堤1️⃣6️⃣断桥残雪</p>
      <p>都是人 风景不如之前</p>
      <br/>
      <p>🌟西湖交通tips：</p>
      <p>❤️西湖游船上岛</p>
      <p>价格：55、70</p>
      <p>码头：钱王祠、花港观鱼、杭饭码头、中山码头</p>
      <p>❤️西湖游船环湖公交船</p>
      <p>路线：参考p2</p>
      <p>注意：没有反向的船，票价6—8元一站。半小时一趟 最晚下午3点半。</p>
      <p>❤️观光车：绕西湖行驶一共4站，招手即停</p>
      <p>绿色的一站10元（绕西湖一圈40元）</p>
      <p>仿古车一站20元（绕西湖一圈80元）</p>
    `,
    id: 1,
    images: Array.from({ length: 12 }, (_, k) => `/mock/mock-guide-view-${k + 1}.JPG`),
    like: 1525,
    publishTime: "2023-12-01T12:00Z",
    resort: {
      id: 1,
      name: "西湖风景名胜区",
    },
    title: "西湖一日游 | 里西湖+外西湖游览路线图",
  }),
)

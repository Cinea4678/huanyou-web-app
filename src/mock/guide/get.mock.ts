import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/guide",
  body() {
    return mockApiResp<Model.TravelGuide>({
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
    })
  },
})

import { defineMock } from "vite-plugin-mock-dev-server"
import { mockApiResp } from "@/mock"

export default defineMock({
  url: "/api/resort",
  body() {
    return mockApiResp<Model.Resort>({
      address: "120.156832,30.260652",
      description:
        "西湖东靠杭州市区，其余三面环山，面积约6.39平方千米，南北长约3.2千米，东西宽约2.8千米，绕湖一周近15千米。西湖平均水深2.27米，水体容量约为1429万立方米。湖中被孤山、白堤、苏堤、杨公堤分隔，按面积大小分别为外西湖、西里湖（又称“后西湖”或“后湖”）、北里湖（又称“里西湖”）、小南湖（又称“南湖”）及岳湖等五片水面。",
      guideList: [],
      id: 1,
      imageList: ["/mock/west-lake-1.jpg", "/mock/west-lake.jpg", "/mock/west-lake-2.jpg", "/mock/west-lake-3.jpg"],
      likes: 1528,
      name: "西湖风景名胜区",
      summary: "中国十大风景名胜之一，全国首批5A级景区，被列入世界遗产名录",
    })
  },
})

import { doAxiosAsyncFull } from "@/utils/axios.ts"
import axios from "axios"
import HomeRecommendResort = API.HomeRecommend.Resort
import TravelNote = API.HomeRecommend.TravelRecord
import Resort = Model.Resort
import ReGeoEncoding = AMap.ReGeo.ReGeoEncoding
import TravelGuide = Model.TravelGuide

export async function GetCurrentUserInfo() {
  // 手动查询
  let result = (await axios.get("/api/user")).data as API.ApiResponse<Model.RegisteredUser>
  if (result.code != 10000) {
    return null
  } else {
    return result.data!
  }
}

export async function GetHomeRecommendResort() {
  return await doAxiosAsyncFull<HomeRecommendResort[]>(axios.get("/api/home-recommend/resort"), "获取推荐景点")
}

export async function GetHomeRecommendTravelNotes() {
  return await doAxiosAsyncFull<TravelNote[]>(axios.get("/api/home-recommend/travel-note"), "获取推荐旅行记录")
}

export async function GetResort(id: string) {
  return await doAxiosAsyncFull<Resort>(axios.get("/api/resort", { params: { id: id } }), "获取景区信息")
}

export async function GetResortGuides(id: string) {
  return await doAxiosAsyncFull<TravelGuide[]>(
    axios.get("/api/guide/by-resort-id", { params: { id: id } }),
    "获取景区攻略",
  )
}

export async function GetTravelGuide(id: string) {
  return await doAxiosAsyncFull<TravelGuide>(axios.get("/api/guide", { params: { id: id } }), "获取旅行攻略")
}

export async function GetTravelRecord(id: string) {
  return await doAxiosAsyncFull<Model.TravelRecord>(axios.get("/api/record", { params: { id: id } }), "获取旅行记录")
}

export function GetUserAvatarUrl(id: number) {
  return `https://s.c.accr.cc/huanyou/mock-avatar-${id % 8}.jpg`
}

export async function CheckPhoneNumber(phoneNumber: string) {
  return await doAxiosAsyncFull<null>(
    axios.post("/api/user/register/check-phone", undefined, { params: { phoneNumber: phoneNumber } }),
    "检查手机号可用",
  )
}

/**
 * 分界线：
 * ↑↑↑ 我们的API
 * ↓↓↓ 高德的API
 */

export const AMapKey = "8f120acdc412bcdf2eea9fdf62045dbe"

export function GetStaticMapUrl(loc: string, zoom: string, size: string, markers: string) {
  if (loc == "") return ""
  let searchParams = new URLSearchParams({
    key: AMapKey,
    location: loc,
    zoom: zoom,
    size: size,
    markers: markers,
  })
  return `//restapi.amap.com/v3/staticmap?${searchParams}`
}

export async function GetRegeoEncode(loc: string, poiType: string, radius: number, extensions: "base" | "all") {
  if (loc == "") {
    return (async () => {
      return {} as ReGeoEncoding
    })()
  }
  return (
    await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      params: {
        key: AMapKey,
        location: loc,
        poitype: poiType,
        radius: radius,
        extensions: extensions,
      },
    })
  ).data as ReGeoEncoding
}

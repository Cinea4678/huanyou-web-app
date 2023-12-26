import { doAxiosAsyncFull } from "@/utils/axios.ts"
import axios from "axios"
import HomeRecommendResort = Application.HomeRecommend.Resort
import TravelNote = Application.HomeRecommend.TravelRecord
import Resort = Model.Resort
import ReGeoEncoding = AMap.ReGeo.ReGeoEncoding
import TravelGuide = Model.TravelGuide

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

import { doAxiosAsyncFull } from "@/utils/axios.ts"
import axios from "axios"
import HomeRecommendResort = Application.HomeRecommend.Resort
import TravelNote = Application.HomeRecommend.TravelRecord
import Resort = Model.Resort

export async function GetHomeRecommendResort() {
  return await doAxiosAsyncFull<HomeRecommendResort[]>(axios.get("/api/home-recommend/resort"), "获取推荐景点")
}

export async function GetHomeRecommendTravelNotes() {
  return await doAxiosAsyncFull<TravelNote[]>(axios.get("/api/home-recommend/travel-note"), "获取推荐旅行记录")
}

export async function GetResort(id: string) {
  return await doAxiosAsyncFull<Resort>(axios.get("/api/resort", { params: { id: id } }), "获取景区信息")
}

import { doAxiosAsyncFull } from "@/utils/axios.ts"
import axios from "axios"
import ScenicSpot = Application.HomeRecommend.Resort
import TravelNote = Application.HomeRecommend.TravelRecord

export async function GetHomeRecommendScenicSpot() {
  return await doAxiosAsyncFull<ScenicSpot[]>(axios.get("/api/home-recommend/scenic-spot"), "获取推荐景点")
}

export async function GetHomeRecommendTravelNotes() {
  return await doAxiosAsyncFull<TravelNote[]>(axios.get("/api/home-recommend/travel-note"), "获取推荐旅行记录")
}

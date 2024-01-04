import { doAxiosAsyncFull } from "@/utils/axios.ts"
import axios from "axios"
import Resort = Model.Resort
import ReGeoEncoding = AMap.ReGeo.ReGeoEncoding
import TravelGuide = Model.TravelGuide
import Page = API.Page
import TravelRecord = Model.TravelRecord

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
  return (
    await doAxiosAsyncFull<Page<Model.Resort>>(
      axios.get("/api/resort/recommend", {
        params: {
          page: 0,
          size: 15,
          sort: "likes,desc",
        },
      }),
      "获取推荐景点",
    )
  ).content
}

export async function ListResort() {
  return (
    await doAxiosAsyncFull<Page<Model.Resort>>(
      axios.get("/api/resort/recommend", {
        params: {
          page: 0,
          size: 500,
          sort: "likes,desc",
        },
      }),
      "获取景点信息",
    )
  ).content
}

export async function ListGuides() {
  return (
    await doAxiosAsyncFull<Page<Model.TravelGuide>>(
      axios.get("/api/guide/recommend", {
        params: {
          page: 0,
          size: 500,
          sort: "likes,desc",
        },
      }),
      "获取旅行攻略信息",
    )
  ).content
}

export async function ListRecords() {
  return (
    await doAxiosAsyncFull<Page<Model.TravelRecord>>(
      axios.get("/api/record/recommend", {
        params: {
          page: 0,
          size: 500,
          sort: "likes,desc",
        },
      }),
      "获取旅行记录信息",
    )
  ).content
}

export async function GetHomeRecommendTravelNotes() {
  return (
    await doAxiosAsyncFull<Page<TravelRecord>>(
      axios.get("/api/record/recommend", {
        params: {
          page: 0,
          size: 15,
          sort: "likes,desc",
        },
      }),
      "获取推荐旅行记录",
    )
  ).content
}

export async function GetResortGuides(id: string) {
  return (
    await doAxiosAsyncFull<Page<TravelGuide>>(
      axios.get("/api/guide/by-resort", {
        params: {
          id: id,
          page: 0,
          size: 15,
          sort: "likes,desc",
        },
      }),
      "获取景区攻略",
    )
  ).content
}

export async function GetResort(id: string) {
  return await doAxiosAsyncFull<Resort>(axios.get("/api/resort", { params: { id: id } }), "获取景区信息")
}

export async function GetTravelGuide(id: string) {
  return await doAxiosAsyncFull<Model.TravelGuide>(axios.get("/api/guide", { params: { id: id } }), "获取旅行攻略")
}

export async function GetTravelRecord(id: string) {
  return await doAxiosAsyncFull<Model.TravelRecord>(axios.get("/api/record", { params: { id: id } }), "获取旅行记录")
}

export async function GetTravelGuideByAuthor(authorId: string) {
  return await doAxiosAsyncFull<Model.TravelGuide[]>(axios.get("/api/guide/by-user", { params: { id: authorId } }), "获取旅行攻略")
}

export async function GetTravelRecordByAuthor(authorId: string) {
  return await doAxiosAsyncFull<Model.TravelRecord[]>(axios.get("/api/record/by-user", { params: { id: authorId } }), "获取旅行记录")
}

export function GetUserAvatarUrl(id: number) {
  return `https://s.c.accr.cc/huanyou/mock-avatar-${id % 12}-new.jpg`
}

export async function CheckPhoneNumber(phoneNumber: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/user/register/check-phone", undefined, { params: { phoneNumber: phoneNumber } }), "检查手机号可用")
}

export async function Register(user: Model.RegisteredUser) {
  return await doAxiosAsyncFull<Model.RegisteredUser>(axios.post("/api/user/register", user), "注册")
}

export async function Login(username: string, password: string) {
  let form = new FormData()
  form.append("username", username)
  form.append("password", password)

  return await doAxiosAsyncFull<null>(axios.post("/api/login", form), "登录")
}

export async function GetUserInfo(id: number | string | null) {
  return await doAxiosAsyncFull<Model.RegisteredUser>(axios.get("/api/user" + (id != null ? `/${id}` : "")), "查询用户信息")
}

export async function SendTravelGuide(guide: TravelGuide) {
  return await doAxiosAsyncFull<null>(axios.post("/api/guide", guide), "发送旅行攻略")
}

export async function SendTravelRecord(record: TravelRecord) {
  return await doAxiosAsyncFull<null>(axios.post("/api/record", record), "发送旅行记录")
}

export async function GetUserOwnedFavorites(userId: string) {
  return await doAxiosAsyncFull<Model.Favorites[]>(axios.get("/api/favorites/user", { params: { userId } }), "获取用户收藏夹")
}

export async function GetUserFollowingFavorites(userId: string) {
  return await doAxiosAsyncFull<Model.Favorites[]>(axios.get("/api/favorites/following", { params: { userId } }), "获取用户关注收藏夹")
}

export async function GetFavorites(id: string) {
  return await doAxiosAsyncFull<Model.Favorites>(axios.get("/api/favorites", { params: { id } }), "获取收藏夹信息")
}

export async function LikeRecord(id: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/record/like", undefined, { params: { id } }), "点赞")
}

export async function CancelLikeRecord(id: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/record/cancel-like", undefined, { params: { id } }), "取消点赞")
}

export async function LikeGuide(id: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/guide/like", undefined, { params: { id } }), "点赞")
}

export async function CancelLikeGuide(id: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/guide/cancel-like", undefined, { params: { id } }), "取消点赞")
}

export async function FavoritesRecord(id: string, favoritesId: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/record/favorite", undefined, { params: { id, favoritesId } }), "收藏")
}

export async function CancelFavoritesRecord(id: string, favoritesId: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/record/cancel-favorite", undefined, { params: { id, favoritesId } }), "取消收藏")
}

export async function FavoritesGuide(id: string, favoritesId: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/guide/favorite", undefined, { params: { id, favoritesId } }), "收藏")
}

export async function CancelFavoritesGuide(id: string, favoritesId: string) {
  return await doAxiosAsyncFull<null>(axios.post("/api/guide/cancel-favorite", undefined, { params: { id, favoritesId } }), "取消收藏")
}

export async function DeleteGuide(id: string) {
  return await doAxiosAsyncFull<null>(axios.delete("/api/guide", { params: { id } }), "删除旅行攻略")
}

export async function DeleteRecord(id: string) {
  return await doAxiosAsyncFull<null>(axios.delete("/api/record", { params: { id } }), "删除旅行记录")
}

export async function SendComment(comment: Model.Comment, to: number, toGuide: boolean) {
  return await doAxiosAsyncFull<null>(axios.post("/api/comment", comment, { params: { to, toGuide } }), "发送评论")
}

export async function DeleteComment(commentId: number) {
  return await doAxiosAsyncFull<null>(axios.delete("/api/comment", { params: { commentId } }), "删除评论")
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

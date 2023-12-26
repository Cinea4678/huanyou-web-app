import Resort = Model.Resort
import ReGeoEncoding = AMap.ReGeo.ReGeoEncoding
import TravelGuide = Model.TravelGuide

export const DefaultResort: Resort = {
  address: "",
  collections: [],
  description: "",
  guideList: [],
  id: "",
  imageList: [],
  likes: 0,
  name: "",
  region: "",
  summary: "",
}

export const DefaultReGeoEncoding: ReGeoEncoding = {
  info: "",
  infocode: "",
  regeocode: {
    addressComponent: {
      adcode: "",
      building: { name: [], type: [] },
      businessAreas: [],
      city: "",
      citycode: "",
      country: "",
      district: "",
      neighborhood: { name: "", type: "" },
      province: "",
      streetNumber: { direction: "", distance: "", location: "", number: "", street: "" },
      towncode: "",
      township: "",
    },
    aois: [],
    formatted_address: "",
    pois: [],
    roadinters: [],
    roads: [],
  },
  status: "",
}

export const DefaultTravelGuide: TravelGuide = {
  author: "",
  comments: [],
  content: "",
  id: "",
  images: [],
  like: 0,
  publishTime: "",
  resort: undefined,
  status: "",
  title: "",
}

import Resort = Model.Resort
import ReGeoEncoding = AMap.ReGeo.ReGeoEncoding
import TravelGuide = Model.TravelGuide

export const DefaultResort: Resort = {
  address: "",
  description: "",
  guideList: [],
  id: 0,
  imageList: [],
  likes: 0,
  name: "",
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
  comments: [],
  content: "",
  id: 0,
  images: [],
  like: 0,
  publishTime: "",
  resort: undefined,
  title: "",
}

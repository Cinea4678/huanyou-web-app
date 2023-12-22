declare namespace Application {
  export interface ApiResponse<T> {
    code: number
    msg: string
    data?: T
  }

  declare namespace HomeRecommend {
    export interface Resort {
      id: string
      imageUrl: string
      description: string
    }

    export interface TravelRecord {
      id: number
      coverUrl: string
      title: string
      description: string
      likes: number
      favorites: number
    }
  }
}

declare namespace Model {
  export interface User {
    id: string
  }

  export interface RegisteredUser extends User {
    passwordMd5: string
    gender: "M" | "F" | "U"
    birthday: string
    signature: string
    phoneNumber: string
    followingUser: string[]
    fansList: string[]
    favoritesList: string[]
    favoritesFollowingList: string[]
    isBanned: boolean
  }

  export interface Administrator extends User {
    passwordMd5: string
    phoneNumber: string
  }

  export interface Appeal {
    id: string
    state: string // 待定
    content: string
    appealTime: string
    banId: string
  }

  export interface Ban {
    id: string
    userId: string
    startTime: string
    duration: number
    reason: string
  }

  export interface Resort {
    id: string
    address: string
    region: string
    name: string
    imageList: string[]
    description: string
    guideList: TravelGuide[]
    summary: string
    likes: number
    collections: string[]
  }

  export interface Comment {
    id: string
    author: string
    time: string
    content: string
  }

  export interface TravelRecord {
    id: string
    author: string
    title: string
    content: string
    images: string[]
    publishTime: string
    like: number
    comments: Comment[]
  }

  export interface TravelGuide {
    id: string
    author: string
    title: string
    content: string
    images: string[]
    publishTime: string
    like: number
    comments: Comment[]
    status: string
    resort: Resort
  }

  export interface Favorites {
    id: string
    name: string
    creationTime: string
    items: string[]
  }
}

declare namespace AMap {
  declare namespace ReGeo {
    export interface ReGeoEncoding {
      status: string
      info: string
      infocode: string
      regeocode: Regeocode
    }

    export interface Regeocode {
      formatted_address: string
      addressComponent: AddressComponent
      pois: Pois[]
      roads: Road[]
      roadinters: Roadinter[]
      aois: Aois[]
    }

    export interface AddressComponent {
      country: string
      province: string
      city: string
      citycode: string
      district: string
      adcode: string
      township: string
      towncode: string
      neighborhood: Neighborhood
      building: Building
      streetNumber: StreetNumber
      businessAreas: BusinessArea[]
    }

    export interface Building {
      name: any[]
      type: any[]
    }

    export interface BusinessArea {
      location: string
      name: string
      id: string
    }

    export interface Neighborhood {
      name: string
      type: string
    }

    export interface StreetNumber {
      street: string
      number: string
      location: string
      direction: string
      distance: string
    }

    export interface Aois {
      id: string
      name: string
      adcode: string
      location: string
      area: string
      distance: string
      type: string
    }

    export interface Pois {
      id: string
      name: string
      type: string
      tel: any[] | string
      direction: string
      distance: string
      location: string
      address: string
      poiweight: string
      businessarea: string
    }

    export interface Roadinter {
      direction: string
      distance: string
      location: string
      first_id: string
      first_name: string
      second_id: string
      second_name: string
    }

    export interface Road {
      id: string
      name: string
      direction: string
      distance: string
      location: string
    }
  }
}

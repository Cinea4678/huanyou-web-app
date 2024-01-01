declare namespace API {
  export interface ApiResponse<T> {
    code: number
    msg: string
    data?: T
  }

  export interface Page<T> {
    content: T[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: Sort
    first: boolean
    numberOfElements: number
    empty: boolean
  }

  export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    paged: boolean
    unpaged: boolean
  }

  export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
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
  export interface RegisteredUser extends User {
    id: number
    name?: string
    passwordHash?: string
    gender?: "男" | "女"
    birthday?: string
    signature?: string
    phoneNumber?: string
    following?: number
    followingRegisteredUser?: RegisteredUser[]
    fans?: number
    fansList?: RegisteredUser[]
    favoritesList?: Favorites[]
    favoritesFollowingList?: Favorites[]
    isBanned?: boolean
    banList?: Ban[]
  }

  export interface Administrator {
    id: string
    passwordHash?: string
    phoneNumber?: string
  }

  export interface Appeal {
    id: number
    state?: "NOT_REVIEWED" | "PASSED" | "REJECTED"
    content?: string
    appealTime?: string
    ban?: Ban
  }

  export interface Ban {
    id: number
    userId?: number
    startTime?: string
    endTime?: string
    reason?: string
  }

  export interface Resort {
    id: number
    address?: string
    name?: string
    imageList?: string[]
    description?: string
    guideList?: TravelGuide[]
    summary?: string
    likes?: number
    likedUser?: RegisteredUser[]
  }

  export interface Comment {
    id: number
    author?: RegisteredUser
    time?: string
    content?: string
    likes?: number
    likedUser?: RegisteredUser[]
    reply?: Comment[]
  }

  export interface TravelRecord {
    id: number
    author?: RegisteredUser
    title?: string
    content?: string
    images?: string[]
    publishTime?: string
    likes?: number
    likedUser?: RegisteredUser[]
    favorites?: number
    comments?: Comment[]
  }

  export interface TravelGuide {
    id: number
    author?: RegisteredUser
    title?: string
    content?: string
    images?: string[]
    publishTime?: string
    likes?: number
    likedUser?: RegisteredUser[]
    favorites?: number
    comments?: Comment[]
    resort?: Resort
  }

  export interface Favorites {
    id: number
    name?: string
    creationTime?: string
    owner?: RegisteredUser
    itemGuides?: TravelGuide[]
    itemRecords?: TravelRecord[]
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
      city: string | string[]
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

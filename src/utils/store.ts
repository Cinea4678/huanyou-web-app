import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

export interface StoreData {
  loggedIn: boolean
  user?: Model.RegisteredUser
}

export const key: InjectionKey<Store<StoreData>> = Symbol()

export const store = createStore<StoreData>({
  state: {
    loggedIn: false,
  },
  mutations: {
    logIn(state, user: Model.RegisteredUser) {
      state.loggedIn = true
      state.user = user
    },
    logOut(state) {
      state.loggedIn = false
      state.user = null
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}

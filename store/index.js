import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import filter from './modules/filter'
import sort from './modules/sort'
import searchChart from './modules/searchChart'
import user from './modules/user'
import garage from './modules/garage'
import manuals from './modules/manuals'
import manual from './modules/manual'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: false
  },
  getters: {
    mobile (state) {
      return state.isMobile
    }
  },
  mutations: {
    UPDATE_IS_MOBILE (state, payload) {
      state.isMobile = payload
    }
  },
  actions: {
  },
  modules: {
    search,
    filter,
    sort,
    searchChart,
    user,
    garage,
    manuals,
    manual
  }
})

export default {
  state: () => ({
    searchParams: {
      mark: [],
      model: [],
      tech_type: [],
      seller: [],
      condition: [],
      price_from: [],
      price_to: [],
      op_time_from: [],
      op_time_to: [],
      year_from: [],
      year_to: []
    }
  }),
  mutations: {
    UPDATE_PARAMS (state, { name, params }) {
      state.searchParams[name] = params
    },
    CLEAR_PARAMS (state) {
      for (let key in state.searchParams) {
        state.searchParams[key] = []
      }
    }
  },
  getters: {
    params (state) {
      let items = {}

      for (let key in state.searchParams) {
        if (state.searchParams[key].length > 0) {
          items[key] = state.searchParams[key].join('|')
        }
      }

      return items
    },
    searchOptions (state) {
      return state.searchParams
    }
  },
  actions: {
  }
}

export default {
  state: () => ({
    manualsFilters: {},
    manualsData: [],
    manualsPicked: {},

    page: 1,
    perPage: 20,
    totalPages: 1,
    totalManuals: 0,

    firstLoad: false
  }),
  mutations: {
    UPDATE_MANUALS_DATA (state, payload) {
      state.manualsData = payload.data
      state.page = payload.current_page
      state.totalPages = payload.last_page,
      state.totalManuals = payload.total
    },
    UPDATE_MANUALS_FILTERS (state, payload) {
      state.manualsFilters = payload
    },
    UPDATE_MANUALS_PICKED (state, payload) {
      state.manualsPicked = payload
    },
    UPDATE_MANUALS_PAGE (state, payload) {
      state.page = payload
    },
    RESET_MANUALS (state) {
      state.manualsData = []
    },
    UPDATE_FIRST_LOAD (state, payload) {
      state.firstLoad = payload
    },
    UPDATE_MANUALS_PAGE (state, payload) {
      state.page = payload
    }
  },
  getters: {
    manualsFilters (state) {
      return state.manualsFilters
    },
    manuals (state) {
      return state.manualsData
    },
    manualsPickedParams (state) {
      const picked = {}

      for (const item in state.manualsPicked) {
        if (state.manualsPicked[item] && state.manualsPicked[item].id) {
          picked[item] = state.manualsPicked[item].id
        }
      }

      return picked
    },
    manualsPicked (state) {
      return state.manualsPicked
    },
    manualsPage (state) {
      return state.page
    },
    manualsTotalItems (state) {
      return state.totalManuals
    },
    manualsTotalPages (state) {
      return state.totalPages
    },
    manualsFirstLoad (state) {
      return state.firstLoad
    }
  },
  actions: {
    async loadManuals (context, params = {}) {
      const page = params.page || context.getters.manualsPage

      try {
        const response = await axios.get('/api/V1/filesearch', {
          params: {
            ...context.getters.manualsPickedParams,
            ...params,
            page: page,
            paginate: context.state.perPage
          }
        })

        context.commit('UPDATE_MANUALS_DATA', response.data.pdf)
        context.commit('UPDATE_MANUALS_FILTERS', response.data.filter)
        context.commit('UPDATE_MANUALS_PICKED', response.data.picked)

        context.commit('UPDATE_FIRST_LOAD', true)

        return response
      } catch (err) {
        return err
      }
    }
  }
}

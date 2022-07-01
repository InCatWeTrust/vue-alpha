export default {
  state: () => ({
    garageFiltersData: {},
    garageFilterParamsData: {}
  }),
  mutations: {
    UPDATE_GARAGE_FILTERS (state, payload) {
      state.garageFiltersData = payload
    },
    UPDATE_GARAGE_FILTER_PARAMS (state, { data, replace = false }) {
      if (!replace) {
        state.garageFilterParamsData = {
          ...state.garageFilterParamsData,
          ...data
        }
      } else {
        state.garageFilterParamsData = data
      }
    },
    RESET_GARAGE_FILTER_PARAMS (state) {
      state.garageFilterParamsData = {}
    }
  },
  getters: {
    garageFilters (state) {
      return state.garageFiltersData.filter || {}
    },
    garageFiltersPicked (state) {
      return state.garageFiltersData.picked || {}
    },
    garageFilterParams (state) {
      return state.garageFilterParamsData || {}
    }
  },
  actions: {
    async loadGarageFilters (context, params) {
      try {
        const response = await axios.get('/api/V1/garage', {
          params
        })

        context.commit('UPDATE_GARAGE_FILTERS', response.data)

        return response
      } catch (err) {
        return err.response
      }
    }
  }
}

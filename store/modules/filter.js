// import seller from '../../data/filter-options/seller'
// import condition from '../../data/filter-options/condition'

export default {
    state: () => ({
      filterOptionsData: {
          mark: [],
          model: [],
          tech_type: [],
          seller: [],
          condition: []
      },
      filterOptionsParamsData: ''
    }),
    mutations: {
      UPDATE_FILTERS (state, payload) {
        for (let key in payload) {
          state.filterOptionsData[key] = payload[key]
        }
      },
      UPDATE_FILTERS_PARAMS (state, params) {
        state.filterOptionsParamsData = params || ''
      }
    },
    getters: {
      filterOptions (state) {
        return state.filterOptionsData
      },
      filterOptionsParams (state) {
        return state.filterOptionsParamsData
      }
    },
    actions: {
      async loadFilters (context, params) {
        let response

        try {
          response = await axios.get(`/api/V1/processing${params || ''}`)

          context.commit('UPDATE_FILTERS', response.data)
        } finally {
          return response
        }
      }
    }
  }

export default {
  state: () => ({
    searchChartData: [],
    searchChartLabels: [] 
  }),
  mutations: {
    UPDATE_SEARCH_CHART (state, { data, labels }) {
      state.searchChartData = data
      state.searchChartLabels = labels
    },
    CLEAR_SEARCH_CHART (state) {
      state.searchChartData = []
      state.searchChartLabels = []
    }
  },
  getters: {
    searchChart (state) {
      return {
        data: state.searchChartData,
        labels: state.searchChartLabels
      }
    }
  },
  actions: {
  }
}

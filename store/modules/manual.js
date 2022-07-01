export default {
  state: () => ({
    manualData: null
  }),
  mutations: {
    UPDATE_MANUAL_DATA (state, payload) {
      state.manualData = payload
    },
    RESET_MANUAL (state) {
      state.manualData = null
    }
  },
  getters: {
    manual (state) {
      return state.manualData
    }
  },
  actions: {
    async loadManual (context, manualId) {
      try {
        context.commit('RESET_MANUAL')

        const response = await axios.get('/api/V1/fileone', {
          params: {
            file_id: manualId
          }
        })

        const item = {
          ...response.data.file,
          ...response.data,
          file: true
        }

        context.commit('UPDATE_MANUAL_DATA', item)

        return response
      } catch (err) {
        return err
      }
    }
  }
}

import { changeUser } from '../../auth'

export default {
  state: () => ({
    userData: {},
    x_xsrf_token: null
  }),
  mutations: {
    UPDATE_USER_DATA (state, data) {
      state.userData = data || {}
    },
    GET_X_TOKEN (state) {
      state.x_xsrf_token = localStorage.getItem('x_xsrf_token') || null
    }
  },
  getters: {
    user (state) {
      return state.userData
    },
    xToken (state) {
      return state.x_xsrf_token
    }
  },
  actions: {
    getUser (context) {
      return axios.get('/api/V1/get')
        .then(res => {
          if (res && res.data) {
            context.commit('UPDATE_USER_DATA', res.data)
            context.commit('GET_X_TOKEN')
  
            changeUser({
              loggedIn: true,
              role: context.getters.user.role || 0
            })

            return res.data
          }
        })
    },
    deleteUser (context) {
      return axios.post('/logout')
        .then((res) => {
          localStorage.removeItem('x_xsrf_token')
          context.commit('UPDATE_USER_DATA', {})
          context.commit('GET_X_TOKEN')

          changeUser({
            loggedIn: false,
            role: 0
          })

          return res.data
        })
    }
  }
}

export default {
  state: () => ({
    sortOptions: {
      price: {
        name: 'Цена',
        slug: 'price',
        checked: false,
        direction: 'asc'
      },
      op_time: {
        name: 'Наработка',
        slug: 'op_time',
        checked: false,
        direction: 'asc'
      },
      year: {
        name: 'Год',
        slug: 'year',
        checked: false,
        direction: 'asc'
      }
    }
  }),
  mutations: {
    UPDATE_SORT (state, { name, checked, direction }) {
      for (let item in state.sortOptions) {
        state.sortOptions[item].checked = false
        state.sortOptions[item].direction = 'asc'
      }

      state.sortOptions[name].checked = checked
      state.sortOptions[name].direction = direction
    },
    CLEAR_SORT (state) {
      for (let item in state.sortOptions) {
        state.sortOptions[item].checked = false
        state.sortOptions[item].direction = 'asc'
      }
    }
  },
  getters: {
    sort (state) {
      return state.sortOptions
    },
    currentSort (state) {
      const sort = {}

      for (let item in state.sortOptions) {
        if (state.sortOptions[item].checked) {
          sort[item] = state.sortOptions[item].direction
        }
      }

      return sort
    }
  },
  actions: {
  }
}

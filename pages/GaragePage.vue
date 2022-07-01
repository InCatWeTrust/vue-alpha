<template>
  <main class="main garage-page">
    <div class="content-container">
      <div class="content-wrapper">
        <TopService
          :tabs="topTabs"
          title="Гараж"
          :active-tab="activeTab"
        />
        <div class="container">
          <GarageAbout
            v-show="activeTab === 1"
          />
          <GarageAdd
            v-show="activeTab === 3"
            :filters-list="garageFilters"
            :filters-picked="garageFiltersPicked"
            :filters-update="filtersUpdate"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TopService from '../components/TopService.vue'
import GarageAbout from '../components/garage/GarageAbout.vue'
import GarageAdd from '../components/garage/GarageAdd.vue'
import garageTabs from '../data/top-service/garageTabs'
import eventBus from '../eventBus'

export default {
  name: 'GaragePage',
  components: {
    TopService,
    GarageAbout,
    GarageAdd
  },
  data () {
    return {
      activeTab: 1,

      filtersLoad: false,
      filtersUpdate: false
    }
  },
  computed: {
    ...mapGetters({
      garageFilters: 'garageFilters',
      garageFiltersPicked: 'garageFiltersPicked',
      garageFilterParams: 'garageFilterParams'
    }),

    topTabs () {
      return garageTabs || []
    }
  },
  created () {
    eventBus.$on('top-tab-change', (id) => { this.activeTab = id })
    eventBus.$on('garage-filters-update', (isUpdate) => { this.filtersUpdate = isUpdate })

    this.loadGarageFilters(this.garageFilterParams)
  },
  methods: {
    ...mapActions({
      loadFilters: 'loadGarageFilters'
    }),
    ...mapMutations({
      updateFilterParams: 'UPDATE_GARAGE_FILTER_PARAMS',
      resetFilterParams: 'RESET_GARAGE_FILTER_PARAMS',
      updateFilters: 'UPDATE_GARAGE_FILTERS'
    }),

    async loadGarageFilters (params) {
      this.filtersLoad = true
      this.filtersUpdate = true

      try {
        await this.loadFilters(params)
      } catch(err) {
        console.log(err.response)
      } finally {
        this.filtersLoad = false
        this.filtersUpdate = false
      }
    }
  },
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.garage-page {
  .content-container {
    background: $windGradient;
  }
}
</style>

<template>
  <div class="main">
    <div class="content-container manual-container">
      <div class="content-wrapper">
        <TopService
          :tabs="topTabs"
          title="Сервисные мануалы"
          :active-tab="activeTab"
        />
        <div class="container">
          <ManualStore
            v-if="activeTab === 1"
            :filters-list-data="manualsFiltersListData"
            :manuals="manualsList"
            :loading="loading"
          />
          <ManualPreview
            v-if="activeTab === 2"
            :loading="manualLoading"
            :manual="manual"
          />
          <ManualSelf
            v-if="activeTab === 3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TopService from '../components/TopService.vue'
import ManualStore from '../components/manual/ManualStore/ManualStore.vue'
import ManualSelf from '../components/manual/ManualSelf/ManualSelf.vue'
import ManualPreview from '../components/manual/ManualPreview/ManualPreview.vue'
import manualTabs from '../data/top-service/manualTabs'
import eventBus from '../eventBus'

export default {
  name: 'ManualPage',
  components: {
    TopService,
    ManualStore,
    ManualSelf,
    ManualPreview
  },
  data () {
    return {
      activeTab: 1,
      loading: false,
      manualLoading: false,

      paginationEvent: false
    }
  },
  computed: {
    ...mapGetters({
      manualsFiltersListData: 'manualsFilters',
      manualsList: 'manuals',
      manual: 'manual',
      firstLoad: 'manualsFirstLoad',
      page: 'manualsPage'
    }),

    topTabs () {
      return manualTabs || []
    }
  },
  created () {
    eventBus.$on('top-tab-change', (id) => { this.activeTab = id })
    eventBus.$on('manual-load-manuals', this.loadManuals)
    eventBus.$on('manual-list-pagination', ({ page }) => {
      this.paginationEvent = true
      this.updatePage(page)
    })
    eventBus.$on('manual-load-manual', this.loadManual)

    if (!this.firstLoad) {
      this.loadManuals()
    }
    this.loadManual()
  },
  beforeDestroy() {
    eventBus.$off('manual-load-manual', this.loadManual)
    eventBus.$off('manual-load-manuals', this.loadManuals)
  },
  watch: {
    page () {
      if (this.paginationEvent) {
        this.paginationEvent = false
        this.loadManuals({ page: this.page })
      }
    }
  },
  methods: {
    ...mapActions({
      loadManualsData: 'loadManuals',
      loadManualData: 'loadManual'
    }),
    ...mapMutations({
      updatePage: 'UPDATE_MANUALS_PAGE'
    }),

    async loadManuals (paramsData) {
      this.loading = true
      const params = paramsData ? paramsData : {}

      if (!params.page) {
        this.updatePage(1)
      }

      try {
        await this.loadManualsData(params)
      } catch (err) {
        console.log(err.response)
      } finally {
        this.loading = false
      }
    },
    async loadManual () {
      this.manualLoading = true
      const id = this.$route.query.id ? this.$route.query.id : null

      try {
        if (id) {
          await this.loadManualData(id)
        }
      } catch (err) {
        console.log(err.response)
      } finally {
        this.manualLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.manual-container {
  background-color: $greyBackground;
}
</style>

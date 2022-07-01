<template>
  <main class="main">
    <transition name="search-popup">
      <SearchListPopup
        v-if="searchPopupOpened"
        :title="searchPopupTitle"
        :text="searchPopupText"
        :show-overlay="showOverlay"
        :opened="searchPopupOpened"
        :html="searchPopupHtml"
      />
    </transition>
    <div class="content-container">
      <div class="content-wrapper">
        <TopService
          :tabs="searchTabs"
          title="Альфа поиск"
          :active-tab="activeTab"
        />
        <div v-show="activeTab === 1">
          <TechTypeComponent
            :items="filterParams.tech_type"
            :current-type="searchParams.tech_type"
            :processing="processing"
          />
          <FilterComponent
            :list-data-loading="listDataLoading"
            :processing="processing"
            :show-overlay="showOverlay"
            :total-products="totalProducts"
          />
          <BaseSort :sort-options="sortOptions" :show-photo="showPhoto" />
          <SearchListComponent
            class="search-list-container"
            :search-items="searchItems"
            :header-titles="headerTitles"
            :show-photo="showPhoto"
            :search-list-load="searchListLoad"
            :search-popup-opened="searchPopupOpened"
            :show-overlay="showOverlay"
            :mobile="mobile"
          />
          <div
            v-if="page !== totalPages"
            class="container"
          >
            <transition name="show-more">
              <button
                v-if="!searchListLoad"
                class="show-more-btn"
                @click.prevent="loadSearchListData"
                :disabled="btnLoad"
              >
                <BasePreloader
                  v-if="btnLoad"
                  :preloader-size="30"
                  background-color="#25abf8"
                  color="#fff"
                />
                Показать ещё
              </button>
            </transition>
          </div>
          <div
            v-show="showOverlay"
            class="overlay"
            @click.prevent="closeOverlay"
          />
          <transition name="gallery">
            <GalleryComponent
              v-if="galleryOpen"
              :images="galleryImages"
              :video="galleryVideo"
            />
          </transition>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TopService from '../components/TopService.vue'
import TechTypeComponent from '../components/TechTypeComponent.vue'
import FilterComponent from '../components/filter/FilterComponent.vue'
import BaseSort from '../components/sort/BaseSort.vue'
import SearchListComponent from '../components/searchList/SearchListComponent.vue'
import SearchListPopup from '../components/searchList/SearchListPopup.vue'
import GalleryComponent from '../components/gallery/GalleryComponent.vue'
import BasePreloader from '../components/BasePreloader.vue'
import { mapActions, mapGetters } from 'vuex'
import sortOptions from '../data/sortOptions'
import headerTitlesData from '../data/searchHeader'
import eventBus from '../eventBus'
import searchTabsData from '../data/top-service/searchTabs'

export default {
  name: 'SearchPage',
  components: {
    TopService,
    FilterComponent,
    BaseSort,
    SearchListComponent,
    GalleryComponent,
    BasePreloader,
    TechTypeComponent,
    SearchListPopup
  },
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sortOptions,
      headerTitlesData,

      searchItemsData: [],
      totalProducts: 0,

      galleryImages: [],
      galleryVideo: '',

      searchListLoad: false,
      btnLoad: false,

      showPhoto: false,
      showOverlay: false,
      galleryOpen: false,
      processing: false,
      listDataLoading: false,

      searchPopupOpened: false,
      searchPopupTitle: null,
      searchPopupText: null,
      searchPopupHtml: null,

      page: 0,
      perPage: 5,
      totalPages: 1,

      sortDirection: 'asc',

      activeTab: 1
    }
  },
  created () {
    eventBus.$on('top-tab-change', (id) => { this.activeTab = id })
    eventBus.$on('show-overlay', isShow => { this.showOverlay = isShow })
    eventBus.$on('show-gallery', ( isOpen, content, items ) => {
      this.galleryOpen = isOpen
      this.galleryVideo = ''
      this.galleryImages = []

      if (content === 'video') {
        this.galleryVideo = items || ''
      } else {
        this.galleryImages = items || []
      }
    })
    eventBus.$on('search-popup', ({ title, text, html }, isOpened) => {
      this.searchPopupTitle = title || null
      this.searchPopupText = text || null
      this.searchPopupHtml = html || null
      this.searchPopupOpened = isOpened
    })
    eventBus.$on('processing', isProcessing => { this.processing = isProcessing })

    eventBus.$on('search-show-photo', isShow => { this.showPhoto = isShow })

    eventBus.$on('accept-filter', () => {
      this.searchItemsData = []
      this.page = 0
      this.totalPages = 1

      this.loadSearchListData()
    })

    eventBus.$on('sort-search-list', (direction) => {
      this.searchItemsData = []
      this.page = 0
      this.totalPages = 1
      this.sortDirection = direction

      this.loadSearchListData()
    })

    this.loadSearchListData()
    this.loadFilters(this.filterOptionsParams)
  },
  computed: {
    ...mapGetters({
      searchParams: 'params',
      filterParams: 'filterOptions',
      filterOptionsParams: 'filterOptionsParams',
      sort: 'sort',
      currentSort: 'currentSort'
    }),

    headerTitles () {
      if (!this.showPhoto) {
        return this.headerTitlesData.filter(item => item.id !== 1)
      }

      return this.headerTitlesData
    },
    searchItems () {
      return this.searchItemsData
    },
    searchTabs () {
      return searchTabsData || []
    }
  },
  methods: {
    ...mapActions({
      'loadFiltersData': 'loadFilters'
    }),

    closeOverlay () {
      this.showOverlay = false
    },
    async loadSearchListData () {
      if (this.page === 0) {
        this.searchListLoad = true
      }
      this.btnLoad = true
      this.listDataLoading = true

      try {
        const response = await axios.get('/api/V1/onefilter', {
          params: {
            ...this.searchParams,
            ...this.currentSort,
            paginate: this.perPage,
            page: this.page + 1
          }
        })

        this.page += 1
        response.data.data.forEach(item => this.searchItemsData.push({
            ...item,
            // price: +item.price.replace(/\s+/g, '') || 0,
            op_time: +item.op_time || 0
          }
        ))
        this.totalPages = response.data.meta.last_page
        this.totalProducts = response.data.meta.total
      } finally {
        this.searchListLoad = false
        this.btnLoad = false
        this.listDataLoading = false
      }
    },
    async loadFilters (params) {
      let response

      try {
        response = await this.loadFiltersData(params)
      } finally {
        return response
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.search-list-container {
  margin-bottom: 25px;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
}

.gallery-enter-active, .gallery-leave-active {
  transition-property: opacity;
  transition-duration: 200ms;
  transition-timing-function: ease;
}
.gallery-enter, .gallery-leave-to {
  opacity: 0;
}

.show-more-btn {
  position: relative;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  background-color: $lightBlue;
  color: $lightGrey;
  overflow: hidden;
  transition-property: transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.show-more-btn:hover,
.show-more-btn:focus {
  transform: translateY(-5px);
  box-shadow: 0 5px 10px $grey;
}

.show-more-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.show-more-enter-active {
  transition-property: transform, opacity;
  transition-duration: 600ms;
  transition-timing-function: ease;
}
.show-more-enter {
  transform: translateY(-20px);
  opacity: 0;
}
.show-more-leave-active {
  transition-property: transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease;
}
.show-more-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.search-popup-enter-active {
  transition-property: transform, opacity;
  transition-duration: 600ms;
  transition-timing-function: ease;
}
.search-popup-enter {
  transform: translate(-50%, -40%);
  opacity: 0;
}
.search-popup-leave-active {
  transition-property: transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease;
}
.search-popup-leave-to {
  transform: translate(-30%, -50%);
  opacity: 0;
}
</style>

<template>
  <div id="manual-store">
    <div class="top">
      <p>
        Найти мануал:
      </p>
      <ManualFilters
        :filters-list-data="filtersListData"
        :loading="loading"
      />
    </div>
    <ManualGridChange
      :grid="grid"
      :loading="loading"
      componentEventName="manual-store"
      class="manual-store-grid-change"
    />
    <div
      class="list-container"
      :class="{
        'load': loading
      }"
    >
      <BasePreloader
        v-if="loading"
        background-color="rgba(246, 246, 246, 0.7)"
        color="#ff9838"
        :preloader-size="60"
        :z-index="8"
      />
      <transition name="manualNotFoundAnimation">
        <div
          v-if="manuals && manuals.length === 0 && !loading"
          class="not-found"
        >
          Ни одного мануала не было найдено, попробуйте другие параметры поиска
        </div>
      </transition>
      <transition name="manualListAnimation">
        <ManualList
          v-if="manuals && manuals.length > 0"
          :grid="grid"
          :items="manuals"
        />
      </transition>
      <transition name="manualListAnimation">
        <div
          v-if="manuals && manuals.length > 0"
          class="pagination-container"
        >
          <BasePagination
            :page="page"
            :totalPages="totalPages"
            :totalItems="totalItems"
            :load="loading"
            event-name="manual-list-pagination"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ManualList from './ManualList.vue'
import ManualGridChange from '../ManualGridChange.vue'
import ManualFilters from './ManualFilters.vue'
import BasePreloader from '../../BasePreloader.vue'
import BasePagination from '../../pagination/BasePagination.vue'
import eventBus from '../../../eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'ManualStore',
  components: {
    ManualList,
    ManualGridChange,
    ManualFilters,
    BasePreloader,
    BasePagination
  },
  props: {
    filtersListData: {
      type: Object,
      default: () => {}
    },
    manuals: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      grid: 'grid'
    }
  },
  computed: {
    ...mapGetters({
      page: 'manualsPage',
      totalItems: 'manualsTotalItems',
      totalPages: 'manualsTotalPages'
    })
  },
  created () {
    eventBus.$on('manual-store-change-grid', (value) => { this.grid = value })
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

#manual-store {
  position: relative;

  .top {
    margin-bottom: 50px;
    padding: 20px;
    background-color: $white;
    border-radius: 10px;
    box-shadow: $smallShadow;

    p {
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 18px;
    }
  }

  .manual-store-grid-change {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .list-container {
    position: relative;
    padding: 0 15px;

    &.load {
      min-height: 200px;
    }

    .not-found {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      line-height: 1.2;
      font-size: 18px;
      font-weight: 500;
      background-color: $white;
      border-radius: 10px;
      color: $brandColor;
    }
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: $white;
    box-shadow: $smallShadow;

    .base-pagination {
      padding: 0;
    }
  }
}

@media (max-width: 1024px) {

#manual-store {
  .manual-store-grid-change {
    position: fixed;
    bottom: 0;
    right: 0;
    top: unset;
    padding: 7px;
    background-color: $white;
    border-top-left-radius: 10px;
    z-index: 10;
  }
}

}

.manualListAnimation-enter-active, .manualListAnimation-leave-active {
  transition-property: opacity;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}
.manualListAnimation-enter, .manualListAnimation-leave-to {
  opacity: 0;
}
.manualNotFoundAnimation-enter-active {
  transition-property: opacity;
  transition-duration: 500ms;
  transition-delay: 500ms;
  transition-timing-function: ease-in-out;
}
.manualNotFoundAnimation-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.manualNotFoundAnimation-enter, .manualNotFoundAnimation-leave-to {
  opacity: 0;
}
</style>

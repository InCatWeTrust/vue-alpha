<template>
  <div>
    <div class="filter-list">
      <BaseFilterInterval
        :slug="['price_from', 'price_to']"
        :search-from="searchData.price_from"
        :search-to="searchData.price_to"
        from-text="Цена, от"
        to-text="Цена, до"
      />
      <BaseFilterOption
        :processing="processing"
        :slug="'mark'"
        :search-data="searchData.mark"
        :options-data="mark"
        :tech-type="searchData.tech_type[0] || null"
        :search="true"
        text="Марка"
        :show-overlay="showOverlay"
        :logo-data="markLogo"
      />
      <BaseFilterVariations
        :processing="processing"
        :slug="'model'"
        :search-data="searchData.model"
        :options-data="filterOptions.model"
        :search="true"
        text="Модель"
        :show-overlay="showOverlay"
      />
      <BaseFilterOption
        :slug="'condition'"
        :search-data="searchData.condition"
        :options-data="filterOptions.condition"
        text="Состояние"
        :show-overlay="showOverlay"
      />
      <BaseFilterInterval
        :slug="['year_from', 'year_to']"
        :search-from="searchData.year_from"
        :search-to="searchData.year_to"
        from-text="Год, от"
        to-text="Год, до"
      />
      <BaseFilterInterval
        :slug="['op_time_from', 'op_time_to']"
        :search-from="searchData.op_time_from"
        :search-to="searchData.op_time_to"
        from-text="Наработка, от"
        to-text="Наработка, до"
      />
      <BaseFilterOption
        :slug="'seller'"
        :search-data="searchData.seller"
        :options-data="filterOptions.seller"
        text="Продавец"
        :show-overlay="showOverlay"
      />
    </div>
    <div class="filter-bottom">
      <div class="filter-total">
        Найдено объявлений: <span>{{ displayNumber }}</span>
      </div>
      <button
        class="filter-buttons filter-clear"
        @click.prevent="clear"
        :disabled="processing"
      >
        <BasePreloader
          v-if="processing"
          :preloaderSize="30"
          background-color="rgb(226, 52, 52)"
          color="#fff"
        />
        Очистить
      </button>
      <button
        class="filter-buttons filter-accept"
        @click.prevent="accept"
        :disabled="processing || listDataLoading"
      >
        <BasePreloader
          v-if="processing"
          :preloaderSize="30"
          background-color="rgb(46, 175, 29)"
          color="#fff"
        />
        Применить
      </button>
    </div>
  </div>
</template>

<script>
import BaseFilterInterval from '../../components/filter/BaseFilterInterval.vue'
import BaseFilterOption from '../../components/filter/BaseFilterOption.vue'
import BaseFilterVariations from '../../components/filter/BaseFilterVariations.vue'
import BasePreloader from '../../components/BasePreloader.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import eventBus from '../../eventBus'

export default {
  name: 'FilterList',
  components: {
    BaseFilterInterval,
    BaseFilterOption,
    BaseFilterVariations,
    BasePreloader
  },
  props: [
    'showOverlay',
    'processing',
    'listDataLoading',
    'totalProducts'
  ],
  data () {
    return {
      displayNumber: 0
    }
  },
  computed: {
    ...mapGetters({
      'filterOptions': 'filterOptions',
      'searchData': 'searchOptions'
    }),

    mark () {
      const arr = []

      for (const item of this.filterOptions.mark) {
        if (item.mark) {
          arr.push(item.mark)
        }
      }

      return arr
    },
    markLogo () {
      const arr = []

      for (const item of this.filterOptions.mark) {
        if (item.logo) {
          arr.push(item.logo)
        }
      }

      return arr
    }
  },
  created () {
    this.displayNumber = this.totalProducts ? this.totalProducts : 0
  },
  methods: {
    ...mapMutations({
      'clearSearchData': 'CLEAR_PARAMS'
    }),
    ...mapActions({
      'loadFilters': 'loadFilters'
    }),

    accept () {
      eventBus.$emit('accept-filter')
    },
    clear () {
      eventBus.$emit('processing', true)

      this.clearSearchData()
      this.loadFilters()
        .finally(() => {
          eventBus.$emit('processing', false)
        })
    }
  },
  watch: {
    totalProducts () {
      clearInterval(this.interval)

      if(this.totalProducts == this.displayNumber) {
        return
      }

      this.interval = window.setInterval(() => {
        if(this.displayNumber != this.totalProducts) {
          let change = (this.totalProducts - this.displayNumber) / 10
          change = change >= 0 ? Math.ceil(change) : Math.floor(change)
          this.displayNumber = this.displayNumber + change
        }
      }, 20)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.filter-list {
  display: grid;
  grid-auto-flow: row dense;
  grid-auto-columns: 1fr;
  grid-auto-rows: 36px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 36px);
  gap: 25px 10px;
  justify-items: stretch;
  align-items: stretch;
  width: 100%;
  margin-bottom: 25px;
}

.filter-buttons {
  position: relative;
  height: 100%;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: 1px;
  color: $white;
  overflow: hidden;
  transition-property: box-shadow, transform;
  transition-duration: 150ms;
  transition-timing-function: ease;
}

.filter-clear {
  grid-column: 5/6;
  background-color: $error;
}

.filter-accept {
  grid-column: 6/6;
  background-color: $success;
}

.filter-buttons:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 8px rgba($almostBlack, 0.5);
}

.filter-buttons:active {
  transform: translateY(0);
  box-shadow: none;
}

.filter-bottom {
  display: grid;
  grid-auto-flow: row dense;
  grid-auto-columns: 1fr;
  grid-auto-rows: 36px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 36px;
  gap: 25px 10px;
  justify-items: stretch;
  align-items: stretch;
  width: 100%;
}

.filter-total {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  grid-column-start: 3;
  grid-column-end: span 2;
  font-size: 14px;
  letter-spacing: 1px;
  color: $darkGreyText;

  span {
    padding-left: 8px;
    font-size: 18px;
    font-weight: 600;
  }
}

@media (max-width: 1024px) {

.filter-bottom {
  gap: 15px 10px;

  .filter-total {
    grid-column: span 6;
    align-items: center;
  }

  .filter-buttons {
    grid-column: span 3;
  }
}

.filter-list {
  gap: 15px 10px;

  .filter-interval,
  .filter-option,
  .filter-variations {
    grid-column: span 6;

    .filter-option__options {
      width: calc(100% + 10px);
    }
  }
}

}
</style>

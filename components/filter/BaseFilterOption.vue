<template>
  <div
    class="filter-option"
    @click.prevent="toggleOverlay"
    :class="{
      'disabled': options.length <= 0,
      'loading': processing
    }"
  >
    <div
      class="filter-option__box"
      :class="{'picked': searchData.length > 0}"
    >
      <span
        class="text-overflow"
        :class="{'picked': searchData.length > 0}"
      >
        {{ searchData[0] || text }}
      </span>
      <svg>
        <use xlink:href="/img/sprites.svg#arrow" />
      </svg>
      <transition name="filter-option">
        <div
          v-show="showOptions"
          class="filter-option__options"
        >
          <BaseFilterSearch
            v-if="search"
            v-model="searchText"
          />
          <div
            class="filter-option__item"
            @click.stop="pickItem('')"
            key="all"
          >
            Любой
          </div>
          <div
            v-show="!searchText || item.toLowerCase().includes(searchText.toLowerCase())"
            v-for="(item, index) in options"
            :key="index"
            class="filter-option__item single"
            :class="{'_mark': logo.length > 0}"
            @click.stop="pickItem(item)"
          >
            <img v-if="logo.length > 0" :src="logo[index]" alt="лого">
            {{ item }}
          </div>
        </div>
      </transition>
    </div>
    <div
      v-show="searchData.length > 0"
      class="filter-delete"
      @click.stop="clearOption"
    />
  </div>
</template>

<script>
import BaseFilterSearch from '../../components/filter/BaseFilterSearch.vue'
import { mapActions, mapMutations } from 'vuex'
import eventBus from '../../eventBus'

export default {
  name: 'BaseFilterOption',
  components: {
    BaseFilterSearch
  },
  props: [
    'showOverlay',
    'search',
    'text',
    'optionsData',
    'searchData',
    'slug',
    'processing',
    'techType',
    'logoData'
  ],
  data () {
    return {
      showOptions: false,
      searchText: ''
    }
  },
  computed: {
    options () {
      return this.optionsData || []
    },
    logo () {
      return this.logoData || []
    }
  },
  methods: {
    ...mapMutations({
      'updateParams': 'UPDATE_PARAMS',
      'updateFiltersParams': 'UPDATE_FILTERS_PARAMS'
    }),
    ...mapActions({
      'loadFilters': 'loadFilters'
    }),

    toggleOverlay () {
      this.showOptions = true
      eventBus.$emit('show-overlay', true)
    },
    pickItem (value) {
      this.showOptions = false

      if (!value) {
        this.updateParams({
          name: this.slug,
          params: []
        })
      } else {
        this.updateParams({
          name: this.slug,
          params: [value]
        })
      }

      if (value && this.slug === 'mark' && this.techType) {
        eventBus.$emit('processing', true)
        const paramsString = `?tech_type=${this.techType}&mark=${value}`

        this.loadFilters(paramsString)
          .then(() => {
            this.updateFiltersParams(paramsString)
          })
          .finally(() => {
            eventBus.$emit('processing', false)
          })
      } else if (!value && this.slug === 'mark' && this.techType) {
        eventBus.$emit('processing', true)
        const paramsString = `?tech_type=${this.techType}`

        this.loadFilters(paramsString)
          .then(() => {
            this.updateParams({
              name: 'model',
              params: []
            })
            this.updateFiltersParams(paramsString)
          })
          .finally(() => {
            eventBus.$emit('processing', false)
          })
      }

      eventBus.$emit('show-overlay', false)
    },
    clearOption () {
      this.showOptions = false

      this.updateParams({
        name: this.slug,
        params: []
      })

      if (this.slug === 'mark' && this.techType) {
        eventBus.$emit('processing', true)
        const paramsString = `?tech_type=${this.techType}`

        this.loadFilters(paramsString)
          .then(() => {
            this.updateParams({
              name: 'model',
              params: []
            })
            this.updateFiltersParams(paramsString)
          })
          .finally(() => {
            eventBus.$emit('processing', false)
          })
      }
    }
  },
  watch: {
    showOverlay () {
      if (this.showOverlay === false) {
        this.showOptions = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.filter-option {
  position: relative;
  cursor: pointer;
  border-radius: 4px;

  &.loading {
    pointer-events: none;
  }

  &.disabled {
    background-color: rgba($grey, 0.3);
    pointer-events: none;

    span::after {
      background: transparent;
    }

    .filter-option__box {
        border-color: transparent;
    }
  }

  span {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0;
    padding-left: 10px;
    border-radius: 4px;
    color: $grey;
    pointer-events: none;
    transition-property: color;
    transition-duration: 200ms;
    transition-timing-function: ease;

     &.picked {
       color: $almostBlack;
     }
  }

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) rotate(180deg);
    width: 10px;
    height: 10px;
    fill: $grey;
    transition-property: fill;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }
}

.filter-option__box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid $grey;
  border-radius: 4px;
  transition-property: border-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

    &.picked {
      border-color: $brandColor;
    }
}

.filter-option__box:hover {
  border-color: $brandColor;
}

.filter-option__box:active {
  border-color: $almostBlack;
  color: $almostBlack;
}

.filter-option__box:active span {
  color: $almostBlack;
}

.filter-option__box:active svg {
  fill: $almostBlack;
}

.filter-option__options {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -5px;
  left: 50%;
  min-width: 200px;
  border-radius: 4px;
  background-color: $white;
  box-shadow: 0 3px 10px rgba($grey, 0.3);
  transform: translateX(-50%);
  z-index: 30;
  overflow: hidden;
  max-height: 200px;
  overflow-y: auto;
}

.filter-option__item {
  position: relative;
  width: 100%;
  padding: 10px;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &.single {
    &._mark {
      padding-left: 50px;
    }
  }

  img {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 40px;
    max-height: 30px;
    object-fit: contain;
  }
}

.filter-option__item:not(:last-child) {
  border-bottom: 1px solid $lightGrey;
}

.filter-option__item:hover {
  background-color: rgba($brandColor, 0.8);
}

.filter-option-enter-active, .filter-option-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
.filter-option-enter, .filter-option-leave-to {
  transform: translate(-50%, 20px);
  opacity: 0;
}
</style>

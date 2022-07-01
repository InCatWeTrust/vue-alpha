<template>
  <div
    class="filter-variations"
    @click.prevent="toggleOverlay"
    :class="{
      'disabled': options.length <= 0,
      'loading': processing
    }"
  >
    <div
      class="filter-variations__box"
      :class="{'picked': pickedItems}"
    >
      <span
        class="text-overflow"
        :class="{'picked': pickedItems}"
      >
        {{ pickedItems || text }}
      </span>
      <svg>
        <use xlink:href="/img/sprites.svg#arrow" />
      </svg>
      <transition name="filter-variations">
        <div
          v-show="showOptions"
          class="filter-variations__options"
        >
          <BaseFilterSearch
            v-if="search"
            v-model="searchText"
          />
          <div
            v-for="(item, index) in options"
            :key="index"
            @click.stop="pickItem(item)"
          >
            <BaseCheckbox
              v-show="!searchText || item.text.toLowerCase().includes(searchText.toLowerCase())"
              :checked="item.checked"
              :text="item.text"
              class="filter-variations__item"
            />
          </div>
        </div>
      </transition>
    </div>
    <div
      v-show="pickedItems"
      class="filter-delete"
      @click.stop="clearVariations"
    />
  </div>
</template>

<script>
import BaseCheckbox from '../../components/BaseCheckbox.vue'
import BaseFilterSearch from '../../components/filter/BaseFilterSearch.vue'
import { mapMutations } from 'vuex'
import eventBus from '../../eventBus'

export default {
  name: 'BaseFilterVariations',
  components: {
    BaseCheckbox,
    BaseFilterSearch
  },
  props: [
    'showOverlay',
    'search',
    'text',
    'optionsData',
    'searchData',
    'slug',
    'processing'
  ],
  data () {
    return {
      optionsAdvanced: [],

      showOptions: false,
      searchText: ''
    }
  },
  computed: {
    pickedItems () {
      let items = ''

      if (this.searchData.length > 0) {
        this.searchData.forEach(item => {
          items += `${item}, `
        })

        return items.slice(0, -2)
      }

      return items
    },
    options () {
      return this.optionsAdvanced || []
    }
  },
  methods: {
    ...mapMutations({
      'updateParams': 'UPDATE_PARAMS'
    }),

    toggleOverlay () {
      this.showOptions = true
      eventBus.$emit('show-overlay', true)
    },
    pickItem (value) {
      if (value.checked) {
        this.updateParams({
          name: this.slug,
          params: this.searchData.filter(item => item !== value.text)
        })

        this.optionsAdvanced.forEach(item => {
          if (item.text === value.text) {
            item.checked = !value.checked
          }
        })
      } else {
        this.updateParams({
          name: this.slug,
          params: this.searchData.concat([value.text])
        })

        this.optionsAdvanced.forEach(item => {
          if (item.text === value.text) {
            item.checked = !value.checked
          }
        })
      }
    },
    clearVariations () {
      this.optionsAdvanced.forEach(item => {
        item.checked = false
      })

      this.updateParams({
        name: this.slug,
        params: []
      })
    },
    getOptions () {
      this.optionsAdvanced = []

      this.optionsData.forEach(item => {
        if (this.searchData.indexOf(item) >= 0) {
          this.optionsAdvanced.push({
            text: item,
            checked: true
          })
        } else {
          this.optionsAdvanced.push({
            text: item,
            checked: false
          })
        }
      })
    }
  },
  watch: {
    showOverlay () {
      if (this.showOverlay === false) {
        this.showOptions = false
      }
    },
    searchData () {
      if (this.searchData.length <= 0) {
        this.optionsAdvanced.map(item => item.checked = false)
      }
    },
    optionsData: {
      handler () {
        this.getOptions()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.filter-variations {
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

    .filter-variations__box {
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

.filter-variations__box {
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

.filter-variations__box:hover {
  border-color: $brandColor;
}

.filter-variations__box:active {
  border-color: $almostBlack;
  color: $almostBlack;
}

.filter-variations__box:active svg {
  fill: $almostBlack;
}

.filter-variations__options {
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

.filter-variations__item {
  width: 100%;
  padding: 10px;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.filter-variations__item:not(:last-child) {
  border-bottom: 1px solid $lightGrey;
}

.filter-variations__item:hover {
  background-color: rgba($grey, 0.3);
}

.filter-variations__item:active {
  background-color: rgba($brandColor, 0.8);
}

.filter-variations-enter-active, .filter-variations-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
.filter-variations-enter, .filter-variations-leave-to {
  transform: translate(-50%, 20px);
  opacity: 0;
}

@media (max-width: 1024px) {

  .filter-variations__options {
    min-width: calc(100% + 10px);
  }

}
</style>

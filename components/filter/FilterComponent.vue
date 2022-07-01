<template>
  <div class="container">
    <section id="filter">
      <div class="filter-wrapper">
        <div
          class="filter-button"
          :class="{'opened': opened}"
          @click.prevent="toggle"
        >
          <span class="filter-button__text">
            Параметры поиска
          </span>
          <svg>
            <use xlink:href="/img/sprites.svg#arrow" />
          </svg>
        </div>
        <transition
          name="filter-popup"
        >
          <div
            v-show="opened"
            class="filter-popup"
          >
            <div class="filter-popup-wrapper">
              <FilterList
                :processing="processing"
                :show-overlay="showOverlay"
                :list-data-loading="listDataLoading"
                :total-products="totalProducts"
              />
            </div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import FilterList from '../../components/filter/FilterList.vue'

export default {
  name: 'FilterComponent',
  components: {
    FilterList
  },
  props: [
    'showOverlay',
    'processing',
    'listDataLoading',
    'totalProducts'
  ],
  data () {
    return {
      opened: true
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.filter-wrapper {
  border-radius: 4px;
}

.filter-button {
  position: relative;
  padding: 20px 40px 20px 25px;
  background-color: $white;
  box-shadow: 0 5px 20px rgba($grey, 0.3);
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
  z-index: 2;

    &.opened {
      svg {
        transform: translateY(-50%) rotate(0);
      }
    }
}

.filter-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: $brandColor;
  transform-origin: top center;
  transform: scale(0);
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.filter-button__text {
  font-size: 20px;
  font-weight: 500;
}

.filter-button svg {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotate(180deg);
  width: 12px;
  height: 12px;
  fill: $darkGreyText;
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.filter-button:hover::after {
  transform: scale(1);
}

.filter-button:active {
  background-color: $lightGrey;
}

.filter-popup {
  background-color: $white;
  transform-origin: top;
}

.filter-popup-wrapper {
  padding: 25px 20px 30px;
}

.filter-popup-enter-active, .filter-popup-leave-active {
  transition-property: transform, opacity;
  transition-duration: 200ms;
  transition-timing-function: ease;
}
.filter-popup-enter, .filter-popup-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

@media (max-width: 1024px) {

.filter-button {
  padding: 15px 40px 15px 25px;
  border-bottom: 3px solid $brandColor;

  &::after {
    content: unset;
  }

  .filter-button__text {
    font-size: 16px;
  }

  svg {
    width: 10px;
    height: 10px;
  }
}

.filter-popup-wrapper {
  padding: 10px;
}

}
</style>

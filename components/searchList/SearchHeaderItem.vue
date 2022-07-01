<template>
  <div
    class="search-header-item"
    :class="{
      'sort-asc': checked && direction === 'asc',
      'sort-desc': checked && direction === 'desc',
      'search-sort': isSortItem,
      'disabled': loading
    }"
    @click.prevent="sort"
  >
    <span v-if="item.text">
      {{ item.text }}
      <svg
        v-show="isSortItem && checked"
        class="sort-arrow"
        :class="{
          'sort-desc': direction === 'desc'
        }"
      >
        <use xlink:href="/img/sprites.svg#arrow" />
      </svg>
    </span>
    <svg v-if="item.svg" class="sort-svg">
      <use :xlink:href="item.svg" />
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import eventBus from '../../eventBus'

export default {
  name: 'SearchHeaderItem',
  props: [
    'item',
    'loading'
  ],
  computed: {
    ...mapGetters({
      sortOptions: 'sort'
    }),

    isSortItem () {
      return this.item.text === 'Цена' || this.item.text === 'Наработка' || this.item.text === 'Год'
    },
    checked () {
      return this.isSortItem ? this.sortOptions[this.item.slug].checked : false
    },
    direction () {
      if (this.isSortItem) {
        if (this.sortOptions[this.item.slug].direction === 'desc') {
          return 'asc'
        } else {
          return 'desc'
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      updateSort: 'UPDATE_SORT'
    }),

    sort () {
      if (this.isSortItem) {
        this.updateSort({
          name: this.item.slug,
          checked: true,
          direction: this.direction
        })

        eventBus.$emit('sort-search-list')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.search-header-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 3px solid transparent;
  font-weight: 500;
  color: $almostBlack;
  transition-property: background-color, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;

  &.search-sort {
    cursor: pointer;

    &:hover {
      background-color: rgba($brandColor, 0.2);
    }
  }

  &.sort-asc {
    background-color: rgba($lightGrey, 1) !important;
    border-bottom-color: $brandColor !important;
  }

  &.sort-desc {
    background-color: rgba($lightGrey, 0.6) !important;
    border-top-color: $brandColor !important;
  }

  &.disabled {
    pointer-events: none;
  }

  span {
    position: relative;
  }

  .sort-svg {
    width: 20px;
    height: 20px;
  }
}

.sort-arrow {
  position: absolute;
  top: 50%;
  left: -16px;
  transform: translateY(-50%) rotate(180deg);
  width: 10px;
  height: 100%;
  fill: $blackText;
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: ease;

  &.sort-desc {
    transform: translateY(-50%) rotate(0);
  }
}

@media (max-width: 1024px) {

.search-header-item {
  &.search-sort {
    padding: 3px 20px 3px 5px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: $lightGrey;

    &:not(:last-child) {
      margin-right: 10px;
    }

    svg {
      right: -16px;
      left: unset;
    }
  }
}

}
</style>

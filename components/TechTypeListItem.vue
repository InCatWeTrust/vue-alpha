<template>
  <li
    class="tech-type-list__item"
    :class="{'active': item === currentType}"
  >
    <a
      href="#"
      class="tech-type-name"
      :class="{'disabled': processing}"
      @click.prevent="pickType(item === currentType ? null : item)"
    >
      {{ item }}
    </a>
    <img src="/img/test_pogruz.png" alt="test">
  </li>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import eventBus from '../eventBus'

export default {
  name: 'TechTypeListItem',
  props: [
    'item',
    'currentType',
    'processing'
  ],
  data () {
    return {
      slug: 'tech_type'
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

    pickType (value) {
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

      if (value && this.slug === 'tech_type') {
        eventBus.$emit('processing', true)
        const paramsString = `?tech_type=${value}`

        this.loadFilters(paramsString)
          .then(() => {
            this.updateFiltersParams(paramsString)
          })
          .finally(() => {
            eventBus.$emit('processing', false)
          })
      } else if (!value && this.slug === 'tech_type') {
        eventBus.$emit('processing', true)

        this.loadFilters()
          .then(() => {
            this.updateParams({
              name: 'mark',
              params: []
            })
            this.updateParams({
              name: 'model',
              params: []
            })
            this.updateFiltersParams('')
          })
          .finally(() => {
            eventBus.$emit('processing', false)
          })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.tech-type-list__item {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 3px solid $background;
  border-radius: 30px;
  overflow: hidden;
  transition-property: border-color, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &:active {
    border-color: $grey;
  }

  &.active {
    border-color: $white;

    &::before {
      opacity: 0;
    }

    &::after {
      opacity: 1;
    }

    &:hover {
      border-color: $brandColor;
    }

    &:active {
      border-color: $grey;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    transition-property: opacity;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }

  &::before {
    background: linear-gradient(to bottom, #8d8d8d, #a5a5a552);
    opacity: 1;
  }

  &::after {
    background: linear-gradient(to bottom, #a797ff, #7cffbd52);
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover::before {
    opacity: 0;
  }

  .tech-type-name {
    margin-bottom: 30px;
    color: $blackText;
    font-weight: 500;
    letter-spacing: 1px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
    }

    &.disabled {
      pointer-events: none;
    }
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    object-fit: contain;
    padding: 20px;
  }
}

@media (max-width: 1024px) {

.tech-type-list__item {
  width: unset;
  height: unset;
  padding: 5px 10px 5px 30px;
  border: 2px solid $background;

  &::after {
    background: transparent;
  }

  &.active {
    background-color: $white;
  }

  .tech-type-name {
    margin-bottom: 0;
    font-size: 14px;
  }

  &::before {
    content: unset;
  }

  img {
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    width: 24px;
    height: unset;
    padding: 0;
  }
}
  
}
</style>

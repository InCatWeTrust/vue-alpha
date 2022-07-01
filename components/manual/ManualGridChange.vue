<template>
  <div class="manual-grid-change">
    <button
      @click.prevent="changeGrid('grid')"
      :disabled="loading"
      :class="{
        'disabled': loading
      }"
    >
      <svg :class="{'active': grid === 'grid'}">
        <use xlink:href="/img/grid.svg#grid" />
      </svg>
    </button>
    <button
      @click.prevent="changeGrid('list')"
      :disabled="loading"
      :class="{
        'disabled': loading
      }"
    >
      <svg :class="{'active': grid === 'list'}">
        <use xlink:href="/img/list.svg#list" />
      </svg>
    </button>
  </div>
</template>

<script>
import eventBus from '../../eventBus'

export default {
  name: 'ManualGridChange',
  props: {
    grid: {
      type: String,
      default: 'grid'
    },
    componentEventName: {
      type: String,
      default: 'manual-store'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeGrid (value) {
      eventBus.$emit(`${this.componentEventName}-change-grid`, value)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.manual-grid-change {
  display: flex;

  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: unset;
    cursor: pointer;

    &:disabled {
      cursor: auto;
    }

    &.disabled {
      svg {
        fill: rgba($grey, 0.5) !important;
      }
    }

    &:hover {
      svg {
        fill: $blue;
      }
    }

    svg {
      width: 30px;
      height: 30px;
      fill: $black;
      transition: fill 200ms ease-in-out;

      &.active {
        fill: $blue;
      }
    }
  }
}
</style>

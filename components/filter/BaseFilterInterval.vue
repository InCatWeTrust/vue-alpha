<template>
  <div
    class="filter-interval"
  >
    <div class="filter-interval__box">
      <input
        v-model="from"
        type="text"
        class="from"
        :class="{'filled': from}"
        @keypress="checkNumber($event)"
        @blur="blur($event, 0)"
      >
      <span v-if="!from">
        {{ fromText }}
      </span>
      <div
        v-show="from"
        class="filter-delete"
        @click.prevent="clearField('from')"
      />
    </div>
    <div class="filter-interval__box">
      <input
        v-model="to"
        type="text"
        class="to"
        :class="{'filled': to}"
        @keypress="checkNumber($event)"
        @blur="blur($event, 1)"
      >
      <span v-if="!to">
        {{ toText }}
      </span>
      <div
        v-show="to"
        class="filter-delete"
        @click.prevent="clearField('to')"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'BaseFilterInterval',
  props: {
    fromText: {
      default: 'От'
    },
    toText: {
      default: 'До'
    },
    slug: {
      default () {
        return ['price_from', 'price_to']
      }
    },
    searchFrom: {
      default: ''
    },
    searchTo: {
      default: ''
    }
  },
  computed: {
    from: {
      get () {
        return this.searchFrom[0]
      },
      set (value) {
        if (!value) {
          this.updateParams({
            name: this.slug[0],
            params: []
          })
        } else {
          this.updateParams({
            name: this.slug[0],
            params: [value]
          })
        }
      }
    },
    to: {
      get () {
        return this.searchTo[0]
      },
      set (value) {
        if (!value) {
          this.updateParams({
            name: this.slug[1],
            params: []
          })
        } else {
          this.updateParams({
            name: this.slug[1],
            params: [value]
          })
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      'updateParams': 'UPDATE_PARAMS'
    }),

    clearField (field) {
      if (field === 'from') {
        this.updateParams({
          name: this.slug[0],
          params: []
        })
      } else {
        this.updateParams({
          name: this.slug[1],
          params: []
        })
      }
    },
    checkNumber (event) {
      event = (event) ? event : window.event
      const charCode = (event.which) ? event.which : event.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        event.preventDefault()
      } else {
        return true
      }
    },
    blur (event, number) {
      if (!+event.target.value) {
        this.updateParams({
          name: this.slug[number],
          params: []
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.filter-interval {
  display: flex;
  flex-wrap: nowrap;
  grid-column: span 2;

  input {
    height: 100%;
    width: 100%;
    border: 1px solid $grey;
    border-radius: 4px;
    padding-left: 10px;
    transition-property: border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;

    &.from {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;

      &.filled {
        border-color: $brandColor;
        border-right-color: $grey;
      }

      &:focus,
      &:hover {
        border-color: $brandColor;
        border-right-color: $grey;
      }
    }

    &.to {
      border-left-width: 0;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;

      &.filled {
        border-color: $brandColor;
        border-left-color: $grey;
      }

      &:focus,
      &:hover {
        border-color: $brandColor;
        border-left-color: $grey;
      }
    }
  }

  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    font-size: 14px;
    color: $grey;
    pointer-events: none;
  }
}

.filter-interval__box {
  position: relative;
  width: 50%;
}
</style>

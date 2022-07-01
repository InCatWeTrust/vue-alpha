<template>
  <div class="garage-add-list-item">
    <transition name="garage-item-animate">
      <div v-show="slug === 'tech_type'
      || (slug === 'mark' && values.length > 0)
      || (markPicked && field !== 'select')
      || (markPicked && values.length > 0)">
        <div
          class="head"
          :class="{
            'opened': opened,
            'picked': titleHighlight
          }"
          @click.prevent="toggle"
        >
          <h3>
            {{ title }}
          </h3>
          <svg>
            <use xlink:href="/img/sprites.svg#arrow" />
          </svg>
        </div>
        <div
          v-show="opened"
          class="dropdown"
        >
          <GarageRadio
            v-if="field === 'select'"
            :list="values"
            class="grid-list"
            :search="isSearch"
            :checked="picked[slug] && String(picked[slug].name)"
            :slug="slug"
            :filters-update="filtersUpdate"
          />
          <!-- <GarageSelect
            v-if="field === 'radio'"
            :list="values"
            class="grid-list"
            :search="isSearch"
          /> -->
          <FormText
            v-if="field === 'input'"
            v-model="formData[slug]"
            :error="formErrors[slug]"
            :title="name"
            class="search"
            valid="9"
          />
          <div v-if="field === 'range'" class="range">
            <FormText
              v-model="formData[`${slug}_from`]"
              :error="formErrors[`${slug}_from`]"
              :title="`${name}, от`"
              class="search input"
              valid="9"
            />
            <FormText
              v-model="formData[`${slug}_to`]"
              :error="formErrors[`${slug}_to`]"
              :title="`${name}, до`"
              class="search input"
              valid="9"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import GarageRadio from './GarageRadio.vue'
import GarageSelect from './GarageSelect.vue'
import FormText from '../form/BaseFormText.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'GarageAddListItem',
  components: {
    GarageRadio,
    GarageSelect,
    FormText
  },
  props: {
    valuesData: {
      type: Array,
      default () {
        return []
      }
    },
    field: {
      type: String,
      default: 'radio'
    },
    name: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    picked: {
      type: Object,
      default () {
        return {}
      }
    },
    filtersUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {},
      formErrors: {},
      opened: false
    }
  },
  computed: {
    ...mapGetters({
      garageFilterParams: 'garageFilterParams'
    }),

    values () {
      return this.valuesData ? this.valuesData : []
    },
    isSearch () {
      return this.values.length > 10 ? true : false
    },
    markPicked () {
      return this.picked.mark ? true : false
    },
    title () {
      if (!this.opened && this.field === 'select' && this.picked[this.slug]) {
        return this.picked[this.slug].name
      } else if (!this.opened && this.field === 'input' && this.garageFilterParams[this.slug]) {
        return `${this.name}: ${this.garageFilterParams[this.slug]}`
      } else {
        return this.name
      }
    },
    titleHighlight () {
      if (this.garageFilterParams[this.slug]
      || this.garageFilterParams[`${this.slug}_from`]
      || this.garageFilterParams[`${this.slug}_to`]) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    formData: {
      handler () {
        this.updateFilterParams({
          data: this.formData
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      updateFilterParams: 'UPDATE_GARAGE_FILTER_PARAMS'
    }),

    toggle () {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.garage-add-list-item {
  .head {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid $grey;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: color 300ms ease-in-out;

    &.opened {
      border-bottom: none;

      svg {
        transform: translate(0, -50%) rotate(0);
      }
    }

    &:active {
      background-color: rgba($white, 0.3);
    }

    &:not(:hover):not(:active):focus {
      border: 1px solid $darkGrey;
    }

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba($white, 0.3);
      transition-property: transform;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;
      z-index: -1;
    }

    &::after {
      transform: translateX(-100%);
    }

    &::before {
      transform: translateX(100%);
    }

    &:hover::after {
      transform: translateX(-50%);
    }

    &:hover::before {
      transform: translateX(50%);
    }

    &.picked {
      color: $brandColor;
    }

    h3 {
      font-size: 20px;
      font-weight: 500;
    }

    svg {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translate(0, -50%) rotate(180deg);
      width: 10px;
      height: 10px;
      fill: $almostBlack;
      transition-property: transform;
      transition-duration: 300ms;
      transition-timing-function: ease;
    }
  }

  .dropdown {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid $grey;

    .range {
      display: flex;
      width: 100%;

      .input {
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }

  .grid-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-flow: dense;
  }

  .search {
    grid-column: span 12;
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
    padding-left: 20px;
    border-radius: 5px;
    border: 1px solid $grey;
    background-color: rgba($white, 0.4);
    transition-property: background-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
    cursor: text;

    &:hover {
      background-color: rgba($white, 0.6);
    }

    input {
      border-bottom: none;
    }
  }
}

@media (max-width: 768px) {
.garage-add-list-item {
  .head {
    padding: 14px;

    h3 {
      font-size: 18px;
    }
  }

  .dropdown {
    padding: 0;
  }
}
}

.garage-item-animate-enter-active, .garage-item-animate-leave-active {
  transition-property: transform, opacity;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}
.garage-item-animate-enter, .garage-item-animate-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

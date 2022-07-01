<template>
  <div
    class="radio-container"
    :class="{
      'checked': isChecked,
      'updating': filtersUpdate
    }"
    @click.prevent="checkRadio"
  >
    <span>{{ label }}</span>
    <div class="radio">
      <input
        :value="value"
        tabindex="-1"
        type="radio"
        :name="name"
        :checked="isChecked"
      >
      <label :for="name" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import eventBus from '../../eventBus'
export default {
  name: 'GarageRadioButton',
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    label: {
      type: String,
      default: 'radio'
    },
    value: {
      type: String,
      default: 'radio'
    },
    error: {
      type: String,
      default: ''
    },
    checked: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    },
    filtersUpdate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      garageFilterParams: 'garageFilterParams'
    }),

    isChecked () {
      return this.checked === this.value ? true : false
    }
  },
  methods: {
    ...mapActions({
      loadFilters: 'loadGarageFilters'
    }),
    ...mapMutations({
      updateFilterParams: 'UPDATE_GARAGE_FILTER_PARAMS',
      resetFilterParams: 'RESET_GARAGE_FILTER_PARAMS'
    }),

    checkRadio () {
      if (!this.filtersUpdate) {
        this.updateParams()

        this.loadGarageFilters(this.garageFilterParams)
      }
    },
    async loadGarageFilters (params) {
      try {
        eventBus.$emit('garage-filters-update', true)

        await this.loadFilters(params)
      } catch(err) {
        console.log(err.response)
      } finally {
        eventBus.$emit('garage-filters-update', false)
      }
    },
    updateParams () {
      if (!this.isChecked) {
        this.updateFilterParams({
          data: {
            [this.slug]: this.id
          }
        })
      } else {
        if (this.slug === 'tech_type') {
          this.resetFilterParams()
        } else if (this.slug === 'mark') {
          this.updateFilterParams({
            data: {
              tech_type: this.garageFilterParams.tech_type
            },
            replace: true
          })
        } else {
          this.updateFilterParams({
            data: {
              [this.slug]: null
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.radio-container {
  grid-column: span 4;
  padding: 12px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 300ms;
  transition-timing-function: ease;

  .checked {
    background-color: rgba($lightBlue, 0.3);
  }

  &.updating {
    label {
      animation: garageRadioPulse 500ms linear infinite alternate;
    }
  }
}

.radio-container span {
  order: 1;
  color: $darkGreyText;
  margin-left: 24px;
  word-break: break-word;
  line-height: 1.1;
}

.radio {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translate(0, -50%);
  width: 16px;
  height: 16px;
  margin-right: 10px;
  pointer-events: none;
}

.radio input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
  pointer-events: none;
}

.radio input + label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: inline-flex;
  border: 1px solid $grey;
  border-radius: 50%;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
  pointer-events: none;
}

.radio input + label::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
    height: 100%;
  transform: translate(-50%, -50%) scale(0);
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: $lightBlue;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.radio-container input:checked + label::before {
  transform: translate(-50%, -50%) scale(1);
}

.radio-container:hover span {
  color: $almostBlack;
}

.radio-container:hover {
  background-color: rgba($lightBlue, 0.3);
}
// стили при наведении курсора на radio
.radio-container:hover input:not(:disabled):not(:checked) + label {
  border-color: $black;
}
// стили для активного состояния радио (при нажатии на него)
.radio-container:active input:not(:disabled) + label::before {
  transform: translate(-50%, -50%) scale(0.3);
}
// стили для радио, находящегося в состоянии disabled
.radio-container input:disabled + label {
  background-color: $lightGreyText;
}

@media (max-width: 768px) {
  .radio-container {
    grid-column: span 6;
    font-size: 14px;
  }
}

@keyframes garageRadioPulse {
  0% {
    background-color: rgba($white, 0);
  }
  100% {
    background-color: rgba($white, 0.5);
  }
}
</style>

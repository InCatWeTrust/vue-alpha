<template>
  <div
    class="manual-filters-item"
    :class="{
      'load': loading
    }"
  >
    <span
      v-if="manualsPickedParams[item.slug]"
      class="close"
      @click.prevent="filterManuals(null, true)"
    />
    <DropdownComponent
      :button-name="(manualsPicked[item.slug] && manualsPicked[item.slug].name) || item.name"
      toggle-dropdown-event-name="manual-filters-toggle-dropdown"
      class="dropdown"
      :class="{
        'picked': manualsPickedParams[item.slug]
      }"
    >
      <ul>
        <li
          v-for="value in item.data"
          :key="value.id"
          @click.prevent="filterManuals(value.id)"
          :class="{
            'picked': manualsPicked[item.slug] && manualsPicked[item.slug].id === value.id
          }"
        >
          {{ value.name }}
        </li>
      </ul>
    </DropdownComponent>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import eventBus from '../../../eventBus'
import DropdownComponent from '../../dropdown/DropdownComponent.vue'

export default {
  name: 'ManualFiltersItem',
  components: {
    DropdownComponent
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      manualsPickedParams: 'manualsPickedParams',
      manualsPicked: 'manualsPicked'
    })
  },
  methods: {
    ...mapActions({
      loadManuals: 'loadManuals'
    }),

    async filterManuals (id, clear = false) {
      eventBus.$emit('manual-filters-toggle-dropdown', false)

      const params = {
        page: 1
      }

      if (clear) {
        params[this.item.slug] = null
      } else {
        params[this.item.slug] = id
      }

      eventBus.$emit('manual-load-manuals', params)
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

.manual-filters-item {
  position: relative;
  width: 200px;
  margin-right: 20px;

  .close {
    @include closeButton;
  }

  &.load {
    pointer-events: none;
    cursor: auto;

    .dropdownButton {
      animation: filterButtonInnerShadow 500ms linear infinite alternate;
    }
  }

  .dropdown {
    transition-property: background-color, color;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;

    &.picked {
      .dropdownButton {
        background-color: $brandColor;
        color: $black;
      }
    }

    .dropdownBox {
      position: relative;
      transform-origin: top;
      z-index: 5;
    }

    .dropdownButton {
      width: 100%;
      display: flex;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid $greyText;
      color: $greyText;
      background-color: $white;
      transition-property: background-color, border-color;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;

      &:hover {
        background-color: $lightGrey;
      }
    }

    ul {
      position: absolute;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-height: 300px;
      padding-top: 5px;
      border: 1px solid $greyText;
      border-top: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      box-shadow: 0px 5px 5px $greyText;
      transform: translateY(-5px);
      overflow: auto;

      li {
        position: relative;
        width: 100%;
        padding: 10px;
        background-color: $white;
        cursor: pointer;
        transition-property: background-color;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;

        &:not(:last-child) {
          border-bottom: 1px solid $lightGrey;
        }

        &:hover {
          background-color: $lightGrey;
        }

        &.picked {
          background-color: $brandColor;
          pointer-events: none;
        }
      }
    }
  }
}

@media (max-width: 768px) {

.manual-filters-item {
  width: 200px;
  margin-right: 0;
  margin-bottom: 10px;
}

}

@keyframes filterButtonInnerShadow {
  0% {
    box-shadow: inset 0 0 0 $lightGrey;
  }
  100% {
    box-shadow: inset 0 0 20px $lightGrey;
  }
}
</style>

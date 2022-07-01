<template>
  <div>
    <button class="dropdownButton" @click.prevent="toggleDropdown">
      {{ buttonName }}
    </button>
    <transition name="baseDropdown">
      <div v-if="isDropdownOpen" class="dropdownBox">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import eventBus from '../../eventBus'

export default {
  name: 'DropdownComponent',
  props: {
    buttonName: {
      type: String,
      default: ''
    },
    toggleDropdownEventName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isDropdownOpen: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      document.addEventListener('click', this.handleDropdownOpen)
    })
  },
  created () {
    eventBus.$on(`${this.toggleDropdownEventName}`, (isOpen) => { this.isDropdownOpen = isOpen })
  },
  methods: {
    handleDropdownOpen (event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false
      }
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleDropdownOpen)
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.baseDropdown-enter-active, .baseDropdown-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}
.baseDropdown-enter {
  opacity: 0;
  transform: translateY(20px);
}
.baseDropdown-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>

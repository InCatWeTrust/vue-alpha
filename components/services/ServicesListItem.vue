<template>
  <li
    class="services-list-item"
    :style="`grid-row: span ${grid.row}; grid-column: span ${grid.column}`"
  >
    <h2 v-if="item.noTemplate && item.title" class="title">
      {{ item.title }}
    </h2>
    <a
      v-if="item.link"
      href="#"
      class="link"
      @click.prevent="link"
    />
    <div class="content">
      <slot />
    </div>
  </li>
</template>

<script>
import auth from '../../auth'
import eventBus from '../../eventBus'

export default {
  name: 'ServicesListItem',
  props: [
    'item'
  ],
  computed: {
    grid () {
      let row = this.item.row || 1
      let column = this.item.column || 6

      return {
        row,
        column
      }
    }
  },
  methods: {
    link () {
      if (auth.logged_in) {
        this.$router.push({name: this.item.link})
      } else {
        eventBus.$emit('login-popup', true)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.services-list-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: $white;
  background: $timberGradient;
  overflow: hidden;
  transition-property: transform, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: ease;

  &:hover,
  &:focus {
    transform: translateY(-10px);
    box-shadow: 0 10px 10px $purple;
  }

  .title {
    font-size: 18px;
    font-weight: 500;
  }

  .link {
    z-index: 5;
  }

  .link::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
  }
}
</style>

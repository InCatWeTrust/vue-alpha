<template>
  <router-link
    :to="{name: item.link}"
    class="side-bar__item"
    :class="{
      'side-bar-tab_active': item.link === $route.name,
      'disabled': role < item.user_access_role
    }"
  >
    <svg>
      <use :xlink:href="item.svg" />
    </svg>
    <span>
      {{ item.text }}
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBarItem',
  props: [
    'item',
    'activeTab'
  ],
  computed: {
    ...mapGetters({
      user: 'user'
    }),

    role () {
      return this.user.role || 0
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.side-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 15px 10px;
  text-decoration: none;
  color: $darkGrey;
  font-weight: 500;
  font-size: 12px;
  transition-property: color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &.disabled {
    opacity: 0.4;
    background-color: white;
    pointer-events: none;
  }
}

.side-bar__item::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($white, 0.5);
  transform: translateX(-100%);
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
  z-index: -1;
}

.side-bar__item svg {
  width: 20px;
  height: 20px;
  fill: $darkGrey;
  margin-bottom: 10px;
  transition-property: fill;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.side-bar__item:hover {
  color: $blackText;
}

.side-bar__item:hover svg{
  fill: $blackText;
}

.side-bar__item:hover::after {
  transform: translateX(0);
}

.side-bar-tab_active {
  background-color: $brandColor !important;
  color: $blackText !important;
}

.side-bar-tab_active svg {
  fill: $blackText !important;
}
</style>
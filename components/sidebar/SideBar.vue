<template>
  <div
    class="side-bar"
    :class="{'opened': sideBarOpened}"
  >
    <div
      v-if="mobile"
      class="menu"
      :class="{'opened': sideBarOpened}"
      @click.prevent="toggleSideBar"
    />
    <div class="side-bar-wrapper">
      <div class="side-bar__list">
        <SideBarItem
          v-for="item in tabs"
          :key="item.id"
          :item="item"
          :active-tab.sync="activeTab"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SideBarItem from '../../components/sidebar/SideBarItem.vue'
import tabs from '../../data/sideBarTabs'

export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tabs,
      activeTab: 1,
      sideBarOpened: false
    }
  },
  mounted () {
    if (window.innerWidth <= 1024) {
      this.sideBarOpened = false
    }
  },
  methods: {
    toggleSideBar () {
      this.sideBarOpened = !this.sideBarOpened
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100px;
  background-color: $blackText;
  z-index: 8;
  transition: transform 200ms ease;

  .menu {
    position: absolute;
    top: 50px;
    right: -40px;
    width: 40px;
    height: 40px;
    border-right: 1px solid $black;
    border-bottom: 1px solid $black;
    background-color: $black;
    border-bottom-right-radius: 10px;
    transition: transform 200ms ease;

    &.opened {
      transform: translateX(-40px);

      &::before,
      &::after {
        top: 50%;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    &::before,
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0);
      width: 50%;
      height: 2px;
      background-color: $brandColor;
      border-radius: 5px;
      transition: all 200ms ease;
    }

    &::before {
      top: calc(50% + 5px);
    }

    &::after {
      top: calc(50% - 5px);
    }
  }
}

.side-bar-wrapper {
  height: 100%;
  overflow-y: auto;
}

.side-bar__list {
  padding-top: 120px;
}

@media (max-width: 1024px) {

.side-bar {
  width: 75px;
  transform: translateX(-72px);

  &.opened {
    transform: translateX(0);
  }
}

}
</style>

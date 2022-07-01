<template>
  <section class="top-service">
    <div class="top-service-top">
      <h1 class="top-service-title">{{ title }}</h1>
    </div>
    <div class="top-service-tabs">
      <a
        v-for="tab in tabs"
        :key="tab.id"
        href="#"
        class="top-service-tabs__item"
        :class="{'top-service-tab_active': tab.id === activeTab}"
        @click.prevent="changeTab(tab.id)"
      >
        <span href="#" class="top-service-tabs__link">
          {{ tab.text }}
        </span>
      </a>
    </div>
  </section>
</template>

<script>
import eventBus from '../eventBus'

export default {
  name: 'TopService',
  props: {
    title: {
      default: ''
    },
    tabs: {
      default () {
        return []
      }
    },
    activeTab: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changeTab (id) {
      eventBus.$emit('top-tab-change', id)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.top-service {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 25px 25px 0;
  margin-bottom: 50px;
  background-color: $white;
  box-shadow: 0 0 15px $blackText;
}

.top-service-title {
  padding-bottom: 25px;
  font-size: 24px;
  font-weight: 400;
  border-bottom: 1px solid $lightGrey;
}

.top-service-tabs {
  display: flex;
  flex-wrap: wrap;
}

.top-service-tabs__item {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  max-width: 150px;
  padding: 0 12px;
  text-decoration: none;
  text-align: center;
  line-height: 1.2;
  color: $greyText;
  border-bottom: 5px solid transparent;
  overflow: hidden;
  transition-property: border-color, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;
  z-index: 1;
}

.top-service-tabs__item::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($grey, 0.2);
  transform: translateY(100%);
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
  z-index: -1;
}

.top-service-tabs__item:hover {
  border-bottom-color: rgba($brandColor, 0.2);
}

.top-service-tabs__item:hover::after {
  transform: translateY(0);
}

.top-service-tab_active {
  border-bottom-color: $brandColor;
  color: $blackText;
}

.top-service-tab_active:hover {
  border-bottom-color: $brandColor;
}

.top-service-tab_active:hover::after {
  transform: translateY(100%);
}

@media (max-width: 1024px) {

.top-service {
  margin-bottom: 20px;
}

.top-service-top {
  text-align: center;
}

.top-service-tabs__item {
  width: 25%;
  height: unset;
  max-width: unset;
  padding: 5px;
  font-size: 14px;

  &:hover {
    border-bottom-color: $white !important;
  }

  &.top-service-tab_active {
    background-color: $brandColor;
    border-bottom-color: $white;
  }
}

}

@media (max-width: 768px) {

.top-service-tabs__item {
  width: 50%;
}

}
</style>

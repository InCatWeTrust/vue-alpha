<template>
  <div class="search-list-popup">
    <div class="popup-wrapper">
      <h2 v-if="title">
        {{ title }}
      </h2>
      <div v-if="html" v-html="html" />
      <span v-if="text && !html">
        {{ text }}
      </span>
    </div>
    <div
      class="popup-close"
      @click.self="closePopup"
    />
  </div>
</template>

<script>
import eventBus from '../../eventBus'
export default {
  name: 'SearchListPopup',
  props: [
    'title',
    'text',
    'html',
    'showOverlay',
    'opened'
  ],
  watch: {
    showOverlay () {
      if (!this.showOverlay && this.opened) {
        eventBus.$emit('search-popup', {}, false)
      }
    }
  },
  methods: {
    closePopup () {
      eventBus.$emit('show-overlay', false)
      eventBus.$emit('search-popup', {}, false)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.search-list-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 900px;
  max-height: 70%;
  color: $white;
  background: linear-gradient(30deg, $blackText, $almostBlack);
  box-shadow: 0 0 20px $almostBlack;
  border: 2px solid $lightGrey;
  border-radius: 10px;
  z-index: 40;
  overflow: auto;

  .popup-wrapper {
    padding: 50px;
  }

  p {
    margin-bottom: 10px;
    line-height: 1.2;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
  }

  span {
    line-height: 1.3;
  }

  .popup-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover::before,
    &:hover::after {
      background-color: $brandColor;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $lightGrey;
      transition-property: background-color;
      transition-duration: 200ms;
      transition-timing-function: ease;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}

@media (max-width: 1024px) {

.search-list-popup {
  width: 80%;

  .popup-wrapper {
    padding: 15px;
    font-size: 14px;
  }

  .popup-close {
    top: 0;
    right: 0;

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
      left: 50%;
      width: 70%;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
      left: 50%;
      width: 70%;
    }
  }
}

}
</style>

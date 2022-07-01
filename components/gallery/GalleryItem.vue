<template>
  <div
    class="gallery-list-img"
    :class="{
      'gallery-img_active': active === index + 1
    }"
    :style="`background-image: url('${image}')`"
    @click.stop="pickImg"
  />
</template>

<script>
import eventBus from '../../eventBus'

export default {
  name: 'GalleryItem',
  props: [
    'image',
    'index',
    'active'
  ],
  methods: {
    pickImg () {
      eventBus.$emit('pick-img', this.index + 1 )
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.gallery-list-img {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 10px;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid $grey;
  border-radius: 4px;
  cursor: pointer;
  transition-property: box-shadow, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &:hover,
  &:focus {
    box-shadow: 0 0 5px $brandColor;;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid transparent;
    border-radius: 4px;
    transition-property: transform, border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }

  &.gallery-img_active {
    border-color: $brandColor;
    box-shadow: none !important;

    &::after {
      border-color: rgba($brandColor, 0.3);
      transform: scale(1.15);
    }
  }
}
</style>
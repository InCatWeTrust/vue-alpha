<template>
  <div class="gallery-list">
    <div class="gallery-list-wrapper">
      <GalleryItem
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :index="index"
        :active="active"
      />
    </div>
  </div>
</template>

<script>
import GalleryItem from './GalleryItem.vue'

export default {
  name: 'GalleryList',
  components: {
    GalleryItem
  },
  props: [
    'images',
    'active'
  ]
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.gallery-list {
  display: flex;
  align-items: center;
  width: auto;
  height: 20%;
  margin: 0 auto;
  max-width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.gallery-list-wrapper {
  display: flex;
  align-items: center;
}
</style>

<template>
  <ul
    class="manual-store-list"
    :class="{
      'list': grid === 'list'
    }"
  >
    <ManualItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :grid="grid"
    />
  </ul>
</template>

<script>
import ManualItem from './ManualItem.vue'

export default {
  name: 'ManualStoreList',
  components: {
    ManualItem
  },
  props: {
    grid: {
      type: String,
      default: 'grid'
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

.manual-store-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  grid-gap: 20px;

  &.list {
    grid-gap: 0;
  }
}
</style>

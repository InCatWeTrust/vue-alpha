<template>
  <ul class="tech-type-list">
    <TechTypeListItem 
      v-for="item in items"
      :key="item"
      :item="item"
      :current-type="currentType"
      :processing="processing"
    />
  </ul>
</template>

<script>
import TechTypeListItem from '../components/TechTypeListItem.vue'

export default {
  name: 'TechTypeList',
  components: {
    TechTypeListItem
  },
  props: [
    'items',
    'currentType',
    'processing'
  ],
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.tech-type-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-columns: 1fr;
  grid-gap: 15px;
}

@media (max-width: 1180px) {
  .tech-type-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1024px) {
  .tech-type-list {
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: unset;
    grid-auto-columns: unset;
    grid-gap: unset;
  }
}
</style>

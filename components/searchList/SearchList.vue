<template>
  <div class="search-list">
    <BasePreloader
      v-if="searchListLoad"
      background-color="#d9d9d9"
      :preloader-size="50"
      color="#ff9838"
    />
    <SearchListItem
      v-for="item in items"
      :key="item.id"
      :item-data="item"
      :show-photo="showPhoto"
      :search-popup-opened="searchPopupOpened"
      :show-overlay="showOverlay"
      :mobile="mobile"
    />
  </div>
</template>

<script>
import SearchListItem from '../../components/searchList/SearchListItem.vue'
import BasePreloader from '../BasePreloader.vue'

export default {
  name: 'SearchList',
  components: {
    SearchListItem,
    BasePreloader
  },
  props: [
    'items',
    'showPhoto',
    'searchListLoad',
    'searchPopupOpened',
    'showOverlay',
    'mobile'
  ]
}
</script>

<style lang="scss">
.search-list {
  position: relative;
  width: 100%;
  min-height: 100px;
}

@media (max-width: 1024px) {

.search-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

}
</style>

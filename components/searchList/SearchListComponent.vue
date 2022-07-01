<template>
  <div class="container">
    <SearchListHeader
      :header-titles="headerTitles"
      :show-photo="showPhoto"
      :loading="searchListLoad"
      :mobile="mobile"
    />
    <SearchList
      :search-list-load="searchListLoad"
      :items="searchItems"
      :show-photo="showPhoto"
      :search-popup-opened="searchPopupOpened"
      :show-overlay="showOverlay"
      :mobile="mobile"
    />
  </div>
</template>

<script>
import SearchList from '../../components/searchList/SearchList.vue';
import SearchListHeader from '../../components/searchList/SearchListHeader.vue';

export default {
  name: 'SearchListComponent',
  components: {
    SearchList,
    SearchListHeader
  },
  props: [
    'showPhoto',
    'headerTitles',
    'searchItems',
    'searchListLoad',
    'searchPopupOpened',
    'showOverlay',
    'mobile'
  ]
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

</style>

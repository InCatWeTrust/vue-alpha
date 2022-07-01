<template>
  <div
    class="search-header"
    :class="{
      'with-photo': showPhoto
    }"
  >
    <span
      v-if="mobile"
      class="title"
    >
      Сортировать по:
    </span>
    <SearchHeaderItem
      v-for="item in headerTitles"
      :key="item.id"
      :item="item"
      :loading="loading"
    />
  </div>
</template>

<script>
import SearchHeaderItem from '../../components/searchList/SearchHeaderItem.vue'

export default {
  name: 'SearchListHeader',
  components: {
    SearchHeaderItem
  },
  props: [
    'headerTitles',
    'showPhoto',
    'loading',
    'mobile'
  ]
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.search-header {
  position: relative;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1.6fr 0.2fr 0.7fr 1fr 1fr 0.9fr 1.5fr 0.2fr;
  grid-template-rows: 60px;
  gap: 0;
  justify-items: stretch;
  width: 100%;
  padding: 0 4px;
  background-color: $white;
  box-shadow: 0 5px 20px rgba($grey, 30%);
  border-radius: 4px;
  align-items: center;
  overflow: overlay;
  z-index: 2;

  &.with-photo {
    grid-template-columns: 320px 1.6fr 0.2fr 0.7fr 1fr 1fr 0.9fr 1.5fr 0.2fr;
  }

  .title {
    width: 100%;
    margin-bottom: 10px;
    font-weight: 500;
  }
}

@media (max-width: 1024px) {

.search-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;

  .search-header-item:not(.search-sort) {
    display: none;
  }
}

}
</style>

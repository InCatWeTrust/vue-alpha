<template>
  <input
    type="text"
    class="filter-search"
    placeholder="Поиск..."
    v-model="searchValue"
  >
</template>

<script>
export default {
  name: 'BaseFilterSearch',
  props: [
    'searchText'
  ],
  computed: {
    searchValue: {
      get () {
        return this.searchText
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables';

.filter-search {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid $lightGrey;
  font-size: 14px;
}

.filter-search::placeholder {
  color: $grey;
}
</style>

<template>
  <div class="garage-select">
    <FormText
      v-if="search"
      v-model="searchValue"
      title="Поиск"
      class="search"
    />
    <GarageSelectItem
      v-for="item in filteredList"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import GarageSelectItem from './GarageSelectItem.vue'
import FormText from '../form/BaseFormText.vue'

export default {
  name: 'GarageSelect',
  components: {
    GarageSelectItem,
    FormText
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    filteredList () {
      return this.list.filter(item => item.value.includes(this.searchValue))
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.garage-select {
  width: 100%;
}
</style>

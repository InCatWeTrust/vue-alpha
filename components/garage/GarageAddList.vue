<template>
  <div class="garage-add-list">
    <GarageAddListItem
      v-for="item in filtersList"
      :key="item.slug"
      :values-data="item.data"
      :field="item.field || item['field ']"
      :name="item.name || ''"
      :slug="item.slug"
      :picked="filtersPicked"
      :filters-update="filtersUpdate"
    />
  </div>
</template>

<script>
import GarageAddListItem from './GarageAddListItem.vue'

export default {
  name: 'GarageAddList',
  components: {
    GarageAddListItem
  },
  props: {
    filtersList: {
      type: Object,
      default () {
        return {}
      }
    },
    filtersPicked: {
      type: Object,
      default () {
        return {}
      }
    },
    filtersUpdate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';
</style>

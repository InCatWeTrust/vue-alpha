<template>
  <div class="garage-add-form">
    <h2>
      Добавить технику в гараж
    </h2>
    <GarageAddList
      :filters-list="filtersList"
      :filters-picked="filtersPicked"
      :filters-update="filtersUpdate"
    />
  </div>
</template>

<script>
import GarageAddList from './GarageAddList.vue'

export default {
  name: 'GarageAdd',
  components: {
    GarageAddList
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

.garage-add-form {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 40px;
  }
}
</style>

<template>
  <form class="manual-filters">
    <transition-group
      name="manualFilterAnimation"
      tag="div"
      class="list"
    >
      <ManualFiltersItem
        v-for="filter in filtersList"
        :key="filter.slug"
        :item="filter"
        :loading="loading"
      />
    </transition-group>
    <!-- <button class="accept">Найти</button> -->
  </form>
</template>

<script>
import ManualFiltersItem from './ManualFiltersItem.vue'

export default {
  name: 'ManualFilters',
  components: {
    ManualFiltersItem
  },
  props: {
    filtersListData: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {},
      formErrors: {}
    }
  },
  computed: {
    filtersList () {
      const objList = {}

      for (const item in this.filtersListData) {
        if (this.filtersListData[item].data && this.filtersListData[item].data.length > 0) {
          objList[item] = this.filtersListData[item]
        }
      }

      return objList
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

.manual-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  // .accept {
  //   border: 1px solid $darkGrey;
  //   padding: 6px 25px;
  //   border-radius: 7px;
  //   color: $black;
  //   background-color: $brandColor;
  //   transition: background-color 300ms ease-in-out;

  //   &:hover {
  //     background-color: rgba($brandColor, 0.7);
  //   }
  // }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {

.manual-filters {
  flex-direction: column;
  align-items: flex-start;

  .list {
    flex-direction: column;
  }
}

}

.manualFilterAnimation-enter-active, .manualFilterAnimation-leave-active {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}
.manualFilterAnimation-enter, .manualFilterAnimation-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

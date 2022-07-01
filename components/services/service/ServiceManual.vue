<template>
  <ServicesListItem :item="item">

  </ServicesListItem>
</template>

<script>
import ServicesListItem from '../ServicesListItem.vue'

export default {
  name: 'ServiceManual',
  components: {
    ServicesListItem
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

</style>

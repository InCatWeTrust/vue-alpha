<template>
  <ul class="services-list">
    <ServiceAdds :item="servicesList.adds" />
    <ServiceStatistics :item="servicesList.statistics" />
    <ServiceGarage :item="servicesList.garage" />
    <ServiceCheck :item="servicesList.check" />
    <ServiceManual :item="servicesList.manual" />
  </ul>
</template>

<script>
import ServicesListItem from './ServicesListItem.vue'
import ServiceAdds from './service/ServiceAdds.vue'
import ServiceStatistics from './service/ServiceStatistics.vue'
import ServiceCheck from './service/ServiceCheck.vue'
import ServiceManual from './service/ServiceManual.vue'
import ServiceGarage from './service/ServiceGarage.vue'
import servicesList from '../../data/services/services-list'

export default {
  name: 'ServicesList',
  components: {
    ServicesListItem,
    ServiceAdds,
    ServiceStatistics,
    ServiceGarage,
    ServiceCheck,
    ServiceManual
  },
  data () {
    return {
      servicesList
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.services-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  grid-auto-columns: 1fr;
  grid-auto-flow: row dense;
  grid-gap: 50px;
}
</style>

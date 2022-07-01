<template>
  <main class="main-page">
    <div class="container">
      <div class="services-list-container">
        <ServicesList />
      </div>
    </div>
  </main>
</template>

<script>
import ServicesList from '../components/services/ServicesList.vue'

export default {
  name: 'MainPage',
  components: {
    ServicesList
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.main-page {
  padding-top: 70px;
  background: linear-gradient(130deg, #222, #2a3166, #553f62, #474456);
  height: calc(100vh - 30px);
  overflow: auto;
}

.services-list-container {
  padding-top: 50px;
  margin-bottom: 50px;
}

@media (max-width: 1024px) {

.main-page {
  padding-top: 50px;
}

}
</style>

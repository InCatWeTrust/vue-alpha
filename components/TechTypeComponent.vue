<template>
  <section id="tech-type-section">
    <div class="container">
      <h2 class="tech-type-title">
        Тип техники
      </h2>
      <div class="tech-type-list-wrapper">
        <TechTypeList :items="items" :current-type="currentType" :processing="processing" />
      </div>
    </div>
  </section>
</template>

<script>
import TechTypeList from '../components/TechTypeList.vue'

export default {
  name: 'TechTypeComponent',
  components: {
    TechTypeList
  },
  props: [
    'items',
    'currentType',
    'processing'
  ],
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

#tech-type-section {
  margin-bottom: 30px;
}

.tech-type-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
}
</style>

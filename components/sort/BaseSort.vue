<template>
  <div class="container">
    <section id="sort">
      <div class="sort-container">
        <SortList :sort-options="sortOptions" :show-photo="showPhoto" />
      </div>
    </section>
  </div>
</template>

<script>
import SortList from '../../components/sort/SortList.vue';

export default {
  name: 'BaseSort',
  components: {
    SortList
  },
  props: [
    'showPhoto',
    'sortOptions'
  ]
}
</script>

<style lang="scss">
.sort-container {
  padding-top: 25px;
  padding-bottom: 25px;
}

@media (max-width: 1024px) {

.sort-container {
  padding: 15px 0;
}

}
</style>

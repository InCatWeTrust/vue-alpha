<template>
  <div class="sort-list">
    <div
      class="sort-item"
      @click.prevent="toggleShowPhoto(!showPhoto)"
    >
      <BaseCheckbox
        text="Показать фото"
        :checked="showPhoto"
      />
    </div>
    <!-- <SortItem
      v-for="option in sortOptions"
      :key="option.id"
      :item="option"
      :show-photo="showPhoto"
    /> -->
  </div>
</template>

<script>
// import SortItem from '../../components/sort/SortItem.vue';
import BaseCheckbox from '../../components/BaseCheckbox.vue'
import eventBus from '../../eventBus';

export default {
  name: 'SortList',
  components: {
    // SortItem,
    BaseCheckbox
  },
  props: [
    'showPhoto',
    'sortOptions'
  ],
  methods: {
    toggleShowPhoto (isShow) {
      eventBus.$emit('search-show-photo', isShow)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.sort-list {
  display: flex;
}

.sort-item:not(:last-child) {
  margin-right: 15px;
}

.sort-item .checkbox-container {
  padding-left: 20px;
  color: $darkGrey;
}

.sort-item .checkbox-container span {
  transition-property: color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.sort-item .checkbox-container .checkbox {
  position: absolute;
  top: 1px;
  left: 0;
}

@media (max-width: 1024px) {

.sort-list {
  flex-direction: column;
}

.sort-item {
  padding: 10px;
  border-radius: 10px;
  background-color: $white;

  &:not(:last-child) {
    margin-right: 0;
    margin-bottom: 5px;
  }
}

}
</style>

<template>
  <div
    class="sort-item"
    @click.prevent="checkItem(item.id, item.checked)"
  >
    <BaseCheckbox
      :text="item.name"
      :checked="item.checked"
    />
  </div>
</template>

<script>
import BaseCheckbox from '../../components/BaseCheckbox.vue'
import eventBus from '../../eventBus'

export default {
  name: 'SortItem',
  components: {
    BaseCheckbox
  },
  props: [
    'item',
    'showPhoto'
  ],
  methods: {
    checkItem (id, checked) {
      eventBus.$emit('search-sort', id, checked)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

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

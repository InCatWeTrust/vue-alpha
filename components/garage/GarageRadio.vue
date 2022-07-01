<template>
  <div class="garage-radio">
    <FormText
      v-if="search"
      v-model="searchValue"
      title="Поиск"
      class="search"
    />
    <GarageRadioButton
      v-for="item in filteredList"
      :key="item.id"
      :value="String(item.name)"
      :label="String(item.name)"
      :name="String(item.name)"
      :slug="slug"
      :checked="String(checked)"
      :id="item.id"
      :filters-update="filtersUpdate"
    />
  </div>
</template>

<script>
import GarageRadioButton from './GarageRadioButton.vue'
import FormText from '../form/BaseFormText.vue'

export default {
  name: 'GarageRadio',
  components: {
    GarageRadioButton,
    FormText
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    search: {
      type: Boolean,
      default: false
    },
    checked: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    filtersUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    filteredList () {
      return this.list.filter(item => String(item.name).includes(this.searchValue))
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.garage-radio {
  width: 100%;
}
</style>

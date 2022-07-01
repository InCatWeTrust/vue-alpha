<template>
  <BaseFormField :focused="focused" :value="dataValue" :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :class="{'form__input--error': error}"
      :type="type"
      :placeholder="placeholderData"
      :maxlength="maxLength"
      @focus="focused = true"
      @focusout="focused = false"
    >
  </BaseFormField>
</template>

<script>
import BaseFormField from './BaseFormField.vue'
import formFieldMixin from '../../mixins/formFieldMixin'
import inputMask from '../../mixins/inputMask'

export default {
  name: 'BaseFormText',
  mixins: [
    formFieldMixin,
    inputMask
  ],
  components: {
    BaseFormField
  },
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.form__input {
  width: 100%;
  height: 30px;
  padding-bottom: 5px;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid $lightGrey;
  background-color: transparent;
  transition-property: border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.form__input:focus,
.form__input:hover {
  border-bottom-color: $brandColor;
}

.form__input--error {
  border-bottom-color: $error;
}

.form__value--top {
  transform: translate(-5px, -15px);
  font-size: 10px;
}
</style>

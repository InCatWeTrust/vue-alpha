<template>
  <label class="form__label">
    <slot />
    <span class="form__value" :class="{'form__value--top': value || focused}">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseFormField',
  props: {
    title: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    focused: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.form__label {
  position: relative;
  padding: 15px 0 0;
  margin-bottom: 20px;
}

.form__value {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 16px;
  color: $greyText;
  transition-property: transform, font-size;
  transition-duration: 100ms;
  transition-timing-function: linear;
  pointer-events: none;
}

.form__error {
  position: relative;
  bottom: 0;
  left: 10px;
  font-size: 14px;
  color: $error;
}
</style>

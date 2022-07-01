<template>
  <div class="checkbox-container">
    <span :class="{'checked': checked}">{{ text }}</span>
    <div class="checkbox">
      <input
        type="checkbox"
        :name="text"
        :checked="checked"
      >
      <label :for="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: [
    'text',
    'checked'
  ]
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.checkbox-container {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  position: relative;
  width: 16px;
  height: 16px;
}

.checkbox input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.checkbox input + label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: inline-flex;
  border: 1px solid $grey;
  border-radius: 4px;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.checkbox input + label::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(0);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $brandColor;
  transition-property: transform, border-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.checkbox input:checked + label::before {
  transform: scale(1.1);
}

.checkbox input:checked + label {
  transform: scale(1.1);
  border-color: $brandColor;
}

.checkbox-container span {
  &.checked {
    color: $blackText;
  }
}

.checkbox-container:hover span {
  color: $blackText;
}

// стили при наведении курсора на checkbox
.checkbox-container:hover input:not(:disabled):not(:checked) + label {
  border-color: $blackText;
}
// стили для активного состояния чекбокса (при нажатии на него)
.checkbox-container:active input:not(:disabled) + label::before {
  transform: scale(0.3);
}
// стили для чекбокса, находящегося в состоянии disabled
.checkbox-container input:disabled + label {
  background-color: $greyText;
}
</style>

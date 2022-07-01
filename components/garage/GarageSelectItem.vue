<template>
  <div
    class="garage-select-item"
    :class="{'checked': checked === item.value}"
  >
    <img src="/img/alpha.png" alt="лого">
    <span>
      {{ item.value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GarageSelectItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    checked: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.garage-select-item {
  grid-column: span 3;
  padding: 12px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 300ms;
  transition-timing-function: ease;

  &:hover {
    background: rgba($lightBlue, 0.3);

    img {
      filter: grayscale(0);
    }

    span {
      color: $almostBlack;
    }
  }

  &.checked {
    background-color: rgba($lightBlue, 0.3);

    svg {
      filter: grayscale(0);
    }

    span {
      color: $almostBlack;
    }
  }

  img {
    width: 16px;
    object-fit: contain;
    margin-right: 10px;
    filter: grayscale(0.8);
    transition-property: filter;
    transition-duration: 300ms;
    transition-timing-function: ease;
  }

  span {
    font-weight: 500;
    color: $darkGreyText;
    transition-property: color;
    transition-duration: 300ms;
    transition-timing-function: ease;
  }
}
</style>
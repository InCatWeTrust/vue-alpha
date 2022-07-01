<template>
  <form class="check-form">
    <div class="inputs">
      <h2 class="title">
        Заполните нужные поля и нажмите "отправить на проверку"
      </h2>
      <div
        v-for="input in inputs"
        :key="input.id"
        class="check-input"
      >
        <span class="check-title">
          {{ input.title }}
        </span>
        <BaseFormText
          v-model="formData[input.slug]"
          :error="formErrors[input.slug]"
          :title="input.input_title"
          :template="input.mask || ''"
          :placeholder="input.placeholder || ''"
          :valid="input.valid || ''"
          :length="input.length || 0"
        />
      </div>
    </div>
    <div class="send">
      <button class="send-btn">
        Отправить на проверку
      </button>
    </div>
  </form>
</template>

<script>
import BaseFormText from '../form/BaseFormText.vue'

export default {
  name: 'CheckForm',
  components: {
      BaseFormText
  },
  props: {
    inputs: {
      default () {
        return []
      }
    }
  },
  data () {
    return {
      formData: {},
      formErrors: {}
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.check-form {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  column-gap: 40px;

  .title {
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
    border-bottom: 1px solid $grey;
  }

  .inputs {
    grid-column: span 9;
    padding: 20px;
    border: 2px solid $grey;
    border-radius: 10px;
    background-color: $white;
    box-shadow: -3px 3px 15px $grey;

    .check-title {
      display: inline-block;
      margin-bottom: 18px;
      font-size: 18px;
      font-weight: 500;
    }

    .check-input {
      width: 100%;
      margin-bottom: 20px;

      .form__input {
        border: 1px solid $grey;
        border-radius: 5px;
        padding: 10px 15px 5px 10px;
        height: 40px;
      }

      .form__value {
        background-color: $white;
        padding: 0 5px;
      }
    }
  }

  .send {
    position: relative;
    grid-column: span 3;

    .send-btn {
      position: sticky;
      top: 90px;
      border: 1px solid $lightGrey;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 1px;
      background-color: $blue;
      color: white;
      border-radius: 5px;
      padding: 14px 10px;
      transition-property: background-color, color;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:hover,
      &:focus {
        background-color: $almostBlack;
        color: $white;
      }

      &:active {
        box-shadow: inset 0 0 10px $white;
      }
    }
  }
}
</style>

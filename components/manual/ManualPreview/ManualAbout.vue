<template>
  <div class="manualAbout">
    <div class="block">
      <div class="box price-box">
        <span class="price">
          {{ manual.price | numberFormat }}
        </span>
        <span class="currency">
          ₽
        </span>
      </div>
      <div class="buy">
        <button class="button">
          Купить
        </button>
      </div>
    </div>
    <div class="block">
      <div class="box file-type">
        <span class="title">
          Тип файла:
        </span>
        <span class="type">
          {{ manual.type_file }}
        </span>
      </div>
      <div class="box file-lang">
        <span class="title">
          Язык:
        </span>
        <span class="lang">
          {{ manual.lang }}
        </span>
      </div>
      <div class="box manual-type">
        <span class="title">
          Тип мануала:
        </span>
        <span class="type">
          {{ manual.type_manual }}
        </span>
      </div>
    </div>
    <div class="block">
      <div class="box file-size">
        <span class="title">
          Размер файла:
        </span>
        <span class="size">
          {{ manual.size }}
        </span>
        <span class="unit">
          mb
        </span>
      </div>
      <div class="box page-count">
        <span class="title">
          Количество страниц:
        </span>
        <span class="count">
          {{ manual.number_pages }}
        </span>
      </div>
    </div>
    <div class="block">
      <div class="box tech-type">
        <span class="title">
          Тип техники:
        </span>
        <span
          v-for="item in manual.tech_type"
          :key="item.id"
          class="name"
        >
          &mdash; {{ item.name }}
        </span>
      </div>
      <div class="box mark">
        <span class="title">
          Марка:
        </span>
        <span
          v-for="item in manual.mark"
          :key="item.id"
          class="name"
        >
          &mdash; {{ item.name }}
        </span>
      </div>
      <div class="box model">
        <span class="title">
          Модель:
        </span>
        <span
          v-for="item in manual.model"
          :key="item.id"
          class="name"
        >
          &mdash; {{ item.name }}
        </span>
      </div>
    </div>
    <div class="block">
      <div class="box description">
        <div class="title mb15">
          Описание:
        </div>
        <p class="text">
          {{ manual.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import numberFormat from '../../../helpers/numberFormat'

export default {
  name: 'ManualAbout',
  filters: {
    numberFormat
  },
  props: {
    manual: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

.manualAbout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;

  .block {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    grid-column: span 12;
    padding: 20px;
    border-radius: 10px;
    box-shadow: $smallShadow;
    background-color: $white;
  }

  .title {
    display: inline-block;
    margin-right: auto;
    font-weight: 500;
  }

  .box {
    display: inline-flex;
    flex-wrap: wrap;
  }

  .price-box {
    margin-right: auto;

    .title {
      font-size: 20px;
    }

    .price {
      margin-right: 5px;
    }

    .price,
    .currency {
      font-weight: 600;
      font-size: 28px;
    }
  }

  .file-type {
    width: 100%;
    border-radius: 10px;
    background-color: $greyBackground;
    padding: 10px 20px;
    align-items: center;
    margin-bottom: 10px;

    .type {
      display: inline-block;
      padding: 7px 20px;
      border-radius: 10px;
      background-color: $brandColor;
      color: $white;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .file-lang {
    width: 100%;
    border-radius: 10px;
    background-color: $greyBackground;
    padding: 10px 20px;
    align-items: center;
    margin-bottom: 10px;

    .lang {
      display: inline-block;
      padding: 7px 20px;
      border-radius: 10px;
      background-color: $lightBlue;
      color: $white;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .file-size {
    width: 50%;

    .title {
      margin-right: 10px;
    }

    .size {
      margin-right: 4px;
      font-size: 18px;
      font-weight: 600;
    }

    .unit {
      align-self: flex-end;
      font-size: 14px;
    }
  }

  .page-count {
    width: 50%;

    .title {
      margin-right: 10px;
    }

    .count {
      font-weight: 500;
    }
  }

  .manual-type {
    width: 100%;
    border-radius: 10px;
    background-color: $greyBackground;
    padding: 10px 20px;
    align-items: center;

    .type {
      display: inline-block;
      padding: 7px 20px;
      border-radius: 10px;
      background-color: $yellow;
      color: $white;
      font-weight: 500;
      font-size: 18px;
    }
  }

  .tech-type {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: $greyBackground;
    border-radius: 10px;

    .title {
      margin-bottom: 7px;
    }

    .name {
      padding-left: 10px;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .mark {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: $greyBackground;
    border-radius: 10px;

    .title {
      margin-bottom: 7px;
    }

    .name {
      padding-left: 10px;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .model {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    background-color: $greyBackground;
    border-radius: 10px;

    .title {
      margin-bottom: 7px;
    }

    .name {
      padding-left: 10px;

      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .description {
    flex-wrap: wrap;

    .title {
      width: 100%;
      font-size: 20px;
    }

    .text {
      line-height: 1.5;
      font-size: 18px;
      color: $almostBlack;
    }
  }

  .buy {
    .button {
      width: 100%;
      padding: 15px 50px;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      color: $white;
      background: linear-gradient(0, $brandColor, $lightBrandColor);
      box-shadow: $shadow30;
      transition-property: filter;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;

      &:hover {
        filter: brightness(1.2);
      }

      &:active {
        box-shadow: 0 0 10px $grey;
      }

      &:not(:hover):not(:active):focus {
        outline: 2px solid $black;
      }
    }
  }
}

@media (max-width: 1024px) {
.manualAbout {
  .file-size {
    width: 100%;
    margin-bottom: 10px;
  }

  .page-count {
    width: 100%;
  }

  .description {
    .title {
      font-size: 18px;
    }

    .text {
      line-height: 1.2;
      font-size: 16px;
    }
  }
}
}
</style>

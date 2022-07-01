<template>
  <li
    class="manual-store-list-item"
    :class="{
      'list': grid === 'list'
    }"
    @click.prevent="previewManual()"
  >
    <div
      v-if="grid !== 'list'"
      class="title-image"
    >
      <img :src="item.images[0].name" :alt="item.images[0].title">
    </div>
    <div class="preview" title="Предпросмотр">
      <svg>
        <use xlink:href="/img/eye.svg#eye" />
      </svg>
    </div>
    <div class="text-box" :title="item.title">
      <span>
        {{ item.title }}
      </span>
    </div>
    <div class="tags">
      <span class="tag file" title="Формат файла">
        {{ item.type_file }}
      </span>
      <span class="tag lang" title="Язык">
        {{ item.lang }}
      </span>
      <span class="tag type" title="Тип">
        {{ item.type_manual }}
      </span>
    </div>
    <div class="price-box">
      <span class="title">
        Цена:
      </span>
      <span class="price">
        <span class="amount">{{ item.price | numberFormat }}</span>
        <span class="currency">₽</span>
      </span>
    </div>
    <button>
      Купить
    </button>
  </li>
</template>

<script>
import eventBus from '../../../eventBus'
import numberFormat from '../../../helpers/numberFormat'

export default {
  name: 'ManualStoreListItem',
  filters: {
    numberFormat
  },
  props: {
    grid: {
      type: String,
      default: 'grid'
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    previewManual () {
      eventBus.$emit('top-tab-change', 2)
      this.$router.push({
        name: 'manual',
        query: { id: this.item.id }
      })
      eventBus.$emit('manual-load-manual')
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

// Отображение списка мануалов в виде сетки
.manual-store-list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-column: span 3;
  border-radius: 10px;
  background-color: $white;
  box-shadow: $smallShadow;
  cursor: pointer;
  transition-property: box-shadow, background-color;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;

  &:hover {
    box-shadow: -5px 5px 20px $darkGrey;
  }

  .title-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .preview {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 1px solid $darkGrey;
    border-radius: 50%;
    background-color: rgba($white, 0.6);
    z-index: 2;

    svg {
      width: 100%;
      height: 100%;
      fill: $black;
      transition-property: fill;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;

      &:hover {
        fill: $blue;
      }
    }
  }

  .text-box {
      height: 95px;
      text-align: center;
      padding: 20px 10px 10px;
      margin-bottom: auto;
      border-bottom: 1px solid $grey;
      z-index: 1;

      span {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 300ms ease-in-out;
      }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;

    .tag {
      display: inline-flex;
      align-items: center;
      text-align: center;
      z-index: 2;
      font-weight: 500;

      &.lang {
        position: absolute;
        top: 25px;
        left: -12px;
        background-color: $lightBlue;
        border-radius: 10px;
        padding: 5px;
        font-size: 10px;
        font-weight: 400;
        color: $white;
      }

      &.type {
        background-color: $yellow;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 12px;
      }

      &.file {
        position: absolute;
        top: 0;
        left: 0;
        padding: 3px 10px;
        font-size: 12px;
        background-color: $red;
        color: $white;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }

  .price-box {
    padding: 10px 5px 20px;
    border-top: 1px dashed $grey;

    .title {
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
    }

    .price {
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-size: 20px;
      font-weight: 500;

      .amount {
        margin-right: 5px;
      }
    }
  }

  button {
    width: 100%;
    padding: 10px 0;
    font-weight: 600;
    color: $white;
    border: none;
    border-top: 1px solid $lightBrandColor;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: linear-gradient(0, $brandColor, $lightBrandColor);
    transition: filter 300ms ease-in-out;
    z-index: 2;

    &:hover {
      filter: brightness(1.2);
    }

    &:not(:hover):not(:active):focus {
      outline: 2px solid $black;
    }
  }
}

@media (max-width: 1024px) {
.manual-store-list-item {
  grid-column: span 4;

  &::before {
    bottom: unset;
    left: unset;
    transform: unset;
    top: 13px;
    right: 5px;
    font-size: 12px;
    letter-spacing: 0;
    color: $blue;
    opacity: 1;
  }

  .text-box {
    padding: 25px 10px 10px;

    span {
      font-size: 14px;
    }
  }
}
}

@media (max-width: 768px) {
.manual-store-list-item {
  grid-column: span 6;
}
}

@media (max-width: 500px) {
.manual-store-list {
  grid-gap: 10px;
}

.manual-store-list-item {
  grid-column: span 12;
  box-shadow: 0 0 5px $darkGrey;

  .title-image {
    height: 350px;
  }
}
}

// Отображение списка мануалов в виде списка (списка списком о_о)
.manual-store-list-item {
  &.list {
    grid-column: span 12;
    flex-direction: row;
    border-radius: 0;
    box-shadow: none;
    width: 100%;
    padding: 5px;

    &:hover {
      background-color: rgba($white, 0.4);
    }

    .preview {
      right: 110px;
      top: 50%;
      transform: translateY(-50%);
    }

    .text-box {
      padding: 0;
      border: none;
      margin: auto 0;
      height: unset;
      margin-right: auto;

      span {
        -webkit-line-clamp: 1;
        padding-right: 200px;
      }
    }

    .tags {
      order: -1;
      flex-wrap: nowrap;

      .tag {
        position: relative !important;
        top: unset !important;
        left: unset !important;
        border-radius: 10px !important;
        padding: 5px 10px !important;
        margin-right: 5px;
      }
    }

    .price-box {
      position: absolute;
      top: 50%;
      right: 150px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      border-top: none;
      padding: 0;

      .title {
        margin-bottom: 0;
        font-size: 14px;
      }

      .price {
        font-size: 16px;
      }
    }

    button {
      width: unset;
      padding: 5px 20px;
      border-radius: 10px;
      border-top: none;
    }
  }
}

@media (max-width: 768px) {
.manual-store-list-item {
  &.list {
    flex-direction: column;

    .preview {
      right: 10px;
      top: 10px;
      transform: unset;
    }

    .text-box {
      margin-bottom: 30px;

      span {
        -webkit-line-clamp: unset;
        padding-right: unset;
      }
    }

    .price-box {
      top: unset;
      right: 50%;
      bottom: 42px;
      transform: translate(50%, 0);

      .title {
        margin-bottom: 0;
        font-size: 14px;
      }

      .price {
        font-size: 16px;
      }
    }
  }
}
}
</style>

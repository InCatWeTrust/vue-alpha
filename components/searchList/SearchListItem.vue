<template>
  <div
    class="search-list-item"
    :class="{
      'with-photo': showPhoto
    }"
  >
    <div
      v-if="showPhoto"
      class="search-list-item__photo"
      @click.prevent="showGallery"
    >
      <div
        v-if="item.video_url"
        class="video"
        @click.stop="showGallery('video')"
      >
        <svg>
          <use xlink:href="/img/video.svg#video" />
        </svg>
        Видео
      </div>
      <div
        v-if="!mobile"
        class="photo-preview"
        :style="`grid-template-columns: repeat(${imagesLength}, 1fr)`"
        @mouseleave="changePhoto(0)"
      >
        <div
          v-for="image in imagesLength"
          :key="image"
          @mouseover="changePhoto(image - 1)"
        />
      </div>
      <div class="photos">
        <svg>
          <use xlink:href="/img/sprites.svg#camera" />
        </svg>
        {{ item.images.length }}
      </div>
      <img :src="imgSrc" :alt="item.title">
    </div>

    <div class="search-list-item__auto">
      <a :href="item.url">
        <span class="mark">
          {{ item.mark }} {{ item.model }}
        </span>
        <span class="type">
          {{ item.tech_type }}
        </span>
      </a>
      <img :src="item.logo" alt="лого">
    </div>

    <a
      :href="item.url"
      class="search-list-item__site"
      v-tooltip="siteTooltip"
    >
      <img :src="fromSite" :alt="item.source">
    </a>

    <div class="search-list-item__year">
      <span v-if="mobile">
        Год:
      </span>
      <span>
        {{ item.year }}
      </span>
    </div>

    <div class="search-list-item__price">
      <span v-if="mobile">
        Цена:
      </span>
      <span class="current-price" :class="{'price-change': item.price_change_to}">
        <svg
          v-if="item.price_change_to"
          :class="{
            'higher': item.price_change_to === 'max' || item.price_change_to == '2',
            'lower': item.price_change_to === 'min' || item.price_change_to == '1'
          }"
          v-tooltip="priceTooltip"
          @click.prevent="openChart"
        >
          <use xlink:href="/img/sprites.svg#price-arrow" />
        </svg>
        {{ price | numberFormat }}
      </span>
      <span v-if="item.price_usd" class="price-usd">
        {{ item.price_usd | numberFormat }} $
      </span>
      <span v-if="item.price_eur" class="price-eur">
        {{ item.price_eur | numberFormat }} €
      </span>
      <span v-if="item.price" class="nds">
        Цена указана
        <span v-if="+item.price_nds">c</span>
        <span v-else>без</span>
        НДС
      </span>
    </div>

    <div class="search-list-item__operating-time">
      <span v-if="mobile">
        Наработка:
      </span>
      <span>
        {{ opTime | numberFormat }}
      </span>
    </div>

    <div class="search-list-item__condition">
      <span v-if="mobile">
        Состояние:
      </span>
      <span>
        {{ item.condition || 'не указано' }}
      </span>
    </div>

    <div class="search-list-item__seller">
      <span v-if="mobile">
        Продавец:
      </span>
      <div>
        {{ item.address }}
      </div>
      <span>
        {{ item.seller_postfix }}
      </span>
    </div>

    <div
      class="search-list-item__options"
      :class="{'hidden': showOptions}"
      @click.self="toggleOptions(!showOptions)"
    >
      <transition name="toggle-options-icon">
        <div
          v-if="!showOptions"
          class="options-icon"
        />
      </transition>
      <transition name="close-options">
        <div
          v-if="showOptions"
          class="options-list"
        >
          <div
            class="options-list__item"
            @click.prevent="openPopup({
              title: 'Описание',
              html: item.description_html,
              text: item.description || 'Описание отсутствует'
            }, true)"
          >
            <span>
              Описание
            </span>
            <img src="/img/description.svg" alt="Описание">
          </div>
          <div class="options-list-close" @click.prevent="closeOptions" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import numberFormat from '../../helpers/numberFormat'
import eventBus from '../../eventBus'
import { mapMutations } from 'vuex'

export default {
  name: 'SearchListItem',
  filters: {
    numberFormat
  },
  props: {
      itemData: {
        default () {
          return {}
        }
      },
      showPhoto: {
        default: false
      },
      searchPopupOpened: {
        default: false
      },
      showOverlay: {
        default: false
      },
      mobile: {
        type: Boolean,
        default: false
      }
  },
  data () {
    return {
      imgSrcData: null,
      maxImages: 5,
      showOptions: false
    }
  },
  computed: {
    priceTooltip () {
      let content = ''

      this.item.price_change_to === 'max' || this.item.price_change_to == '2'
      ? content = 'Продавец повысил цену'
      : content = 'Продавец снизил цену'

      return {
        content,
        placement: 'top'
      }
    },
    siteTooltip () {
      return {
        content: `Объявление на ${this.item.source}`,
        placement: 'top'
      }
    },
    fromSite () {
      if (this.item.source === 'avito') {
        return '/img/avito.webp'
      }
    },
    opTime () {
      return this.item.op_time || 'не указана'
    },
    price () {
      return this.item.price || 'не указана'
    },
    item () {
      const images = this.itemData.images_collection.map(item => item.image)

      return {
        ...this.itemData,
        images
      }
    },
    imgSrc () {
      const firstImg = this.item.images && this.item.images[0] || ''

      return this.imgSrcData ? this.imgSrcData : firstImg
    },
    imagesLength () {
      let images = this.item.images && this.item.images.length

      if (images && images > this.maxImages) {
        images = this.maxImages
      }

      return images ? images : 1
    }
  },
  watch: {
    showOverlay () {
      if (!this.showOverlay && this.showOptions) {
        this.showOptions = false
      }
    }
  },
  methods: {
    ...mapMutations({
      updateChart: 'UPDATE_SEARCH_CHART'
    }),

    showGallery (content = 'images') {
      let items
      if (content === 'video') {
        items = this.item.video_url
      } else {
        items = this.item.images
      }

      eventBus.$emit('show-gallery', true, content, items)
    },
    changePhoto (index) {
      this.imgSrcData = this.item.images[index]
    },
    toggleOptions (isShow) {
      if (isShow) {
        eventBus.$emit('show-overlay', true)
      }
      this.showOptions = isShow
    },
    closeOptions () {
      eventBus.$emit('show-overlay', false)
      this.showOptions = false
    },
    openPopup ({ title, text, html }, isOpened) {
      eventBus.$emit('show-overlay', true)
      eventBus.$emit('search-popup', { title, text, html }, isOpened)
      this.showOptions = false
    },
    openChart () {
      const data = []
      const labels = []

      function convertDate(date) {
        return date.toString().length <= 1 ? '0' + date.toString() : date
      }

      for (const item of this.item.prices_collection) {
        const date = new Date(item.created_at)

        // const time = convertDate(date.getHours())
        // + ':'
        // + convertDate(date.getMinutes())
        // + ':'
        // + convertDate(date.getSeconds())

        const editedDate = convertDate(date.getDate())
        + '.'
        + convertDate((date.getMonth()+ 1))
        + '.'
        + convertDate(date.getFullYear())
        // + ', '
        // + time

        data.push(item.price)
        labels.push(editedDate)
      }

      this.updateChart({
        data,
        labels
      })

      eventBus.$emit('chart-popup', true)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.search-list-item {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1.6fr 0.2fr 0.7fr 1fr 1fr 0.9fr 1.5fr 0.2fr;
  grid-template-rows: auto;
  gap: 0;
  justify-items: stretch;
  width: 100%;
  margin: 0 auto;
  padding: 10px 0;
  color: $almostBlack;
  background-color: $white;
  align-items: center;
  border: 1px solid $lightGrey;
  border-top: none;
  text-align: center;

  &.with-photo {
    grid-template-columns: 320px 1.6fr 0.2fr 0.7fr 1fr 1fr 0.9fr 1.5fr 0.2fr;
    padding: 0;
  }
}

.search-list-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.search-list-item__photo {
  position: relative;
  padding: 10px;
  height: 200px;
  overflow: hidden;
  cursor: pointer;

  .photo-preview {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    display: grid;
    grid-auto-flow: row dense;
    grid-template-rows: 100%;
    gap: 0;
    width: calc(100% - 20px);

    div {
      border-bottom: 6px solid rgba($white, 0.7);
      transition-property: border-color;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:hover {
        border-bottom-color: $brandColor;
      }
    }
  }

  .video {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 4px 0 27px;
    font-size: 14px;
    font-weight: 400;
    border-bottom-left-radius: 4px;
    color: $white;
    background-color: rgba($almostBlack, 0.7);
    z-index: 3;
    transition-property: color, background-color;
    transition-duration: 300ms;
    transition-timing-function: ease;

    &:hover {
      background-color: $brandColor;
      color: $blackText;
    }

    svg {
      width: 22px;
      height: 22px;
      stroke: $white;
      position: absolute;
      top: 50%;
      left: 4px;
      transform: translate(0, -50%);
    }
  }

  .photos {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
    height: 20px;
    padding: 0 3px 0 22px;
    font-size: 14px;
    font-weight: 400;
    border-top-left-radius: 4px;
    color: $white;
    background-color: rgba($almostBlack, 0.7);
    z-index: 2;

    svg {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translate(0, -50%);
      width: 16px;
      height: 16px;
      fill: $white;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.search-list-item__auto {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100px;
  word-break: break-word;

  a {
    display: inline-flex;
    flex-direction: column;
    padding: 0 5px;
    font-size: 14px;
    line-height: 1.2;
    color: $brandColor;
    transition-property: color;
    transition-duration: 200ms;
    transition-timing-function: ease;
    z-index: 1;

    &:hover,
    &:focus {
      color: $lightBlue;
    }

    .mark {
      margin-bottom: 5px;
    }
  }

  img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 50px;
    object-fit: contain;
    opacity: 0.1;
    pointer-events: none;
  }
}

.search-list-item__site {

  img {
    width: 20px;
    height: 20px;
  }
}

.search-list-item__year {
  font-weight: 400;
  color: $grey;
}

.search-list-item__price {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 15px 0;

  .current-price {
    position: relative;
    font-weight: 500;
    line-height: 1.2;

    &.price-change {
      padding-left: 15px;
    }

    svg {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      width: 13px;
      height: 13px;
      cursor: pointer;

      &.higher {
        fill: $error;
      }

      &.lower {
        fill: $success;
        transform: translate(0, -50%) rotate(180deg);
      }
    }
  }

  .price-usd,
  .price-eur {
    margin-top: 3px;
    font-size: 12px;
    color: $greyText;
  }

  .nds {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 10px;
    font-weight: 300;
    color: $greyText;
  }
}

.search-list-item__operating-time {

  span {
    font-size: 14px;
    font-weight: 400;
  }
}

.search-list-item__condition {

  span {
    font-size: 14px;
    font-weight: 500;
  }
}

.search-list-item__seller {
  padding: 0 10px;

  div {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 500;
  }

  span {
    font-size: 14px;
    color: $grey;
  }
}

.search-list-item__options {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &:hover {
    background-color: rgba($grey, 0.2);
  }

  &:active {
    background-color: rgba($success, 0.2);
  }

  &.hidden:hover {
    background-color: transparent;
  }

  &.hidden:active {
    background-color: transparent;
  }

  .options-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: $brandColor;
    pointer-events: none;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: $almostBlack;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }
  }

  .options-list {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 2;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid $lightGrey;
    box-shadow: -3px -3px 10px $lightGrey;
    z-index: 30;

    .options-list__item {
      display: flex;
      align-items: center;
      padding: 10px 40px 10px 10px;
      min-width: 200px;
      background-color: white;
      transition-property: background-color;
      transition-duration: 200ms;
      transition-timing-function: ease;

      &:hover {
        background-color: $brandColor;
      }

      &:active {
        background-color: $lightBlue;
      }

      span {
        margin-right: 12px;
        font-weight: 500;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    .options-list-close {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translate(0, -50%);
      width: 20px;
      height: 20px;

      &:hover::before,
      &:hover::after {
        background-color: $brandColor;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $blackText;
        transition-property: background-color;
        transition-duration: 200ms;
        transition-timing-function: ease;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}

.toggle-options-icon-enter-active .toggle-options-icon-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
.toggle-options-icon-enter .toggle-options-icon-leave-to {
  opacity: 0;
}

.close-options-enter-active .close-options-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: ease;
}
.close-options-enter .close-options-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {

.search-list-item {
  grid-template-columns: repeat(12, 1fr);
  grid-column: span 4;
  order: -2;
  gap: 10px;
  padding: 10px 0;

  &.with-photo {
    grid-template-columns: repeat(12, 1fr);
    padding: 10px 0;
  }

  .search-list-item__photo {
    order: 0;
    grid-column: span 12;
  }

  .search-list-item__auto {
    grid-column: span 8;
    order: -3;
    min-height: 80px;
  }

  .search-list-item__site {
    grid-column: span 1;
    order: -2;
  }

  .search-list-item__year {
    grid-column: span 6;
    font-size: 14px;
  }

  .search-list-item__price {
    grid-column: span 6;

    .nds {
      bottom: 0;
      right: unset;
    }
  }

  .search-list-item__operating-time {
    grid-column: span 6;
  }

  .search-list-item__condition {
    grid-column: span 6;
  }

  .search-list-item__seller {
    grid-column: span 12;
  }

  .search-list-item__options {
    grid-column: span 3;
    order: -1;

    .options-icon {
      transform: rotate(90deg);
    }
  }
}

}

@media (max-width: 800px) {

.search-list-item {
  grid-column: span 6;
}

}

@media (max-width: 500px) {

.search-list-item {
  grid-column: span 12;
}

}
</style>

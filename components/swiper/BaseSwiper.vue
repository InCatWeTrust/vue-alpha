<template>
  <div
    v-swiper:swiper="swiperOption"
    :loadtheme="false"
    @ready="getPosition"
    @observer-update="getPosition"
    @slide-change="getPosition"
  >
    <div class="swiper-wrapper">
      <div v-for="item in items" :key="item.article || item" class="swiper-slide">
        <slot
          :item="item"
        />
      </div>
    </div>
    <div
      v-if="pagination"
      class="swiper-pagination"
      :class="{'desktop': !isMobile}"
    >
      <span
        v-for="bullet in items.length"
        :key="bullet"
        class="bullet"
        :class="{
          'active-bullet': activeSlide === bullet - 1
        }"
        @mouseover="hoverPagination(bullet - 1)"
      />
    </div>
    <div
      v-show="!isBeginning"
      slot="button-prev"
      class="swiper-button-prev"
      @click.prevent="prev"
    >
      <svg class="swiper-button-svg">
        <use xlink:href="/img/sprites/arrow-swipe.svg#arrow-swipe" />
      </svg>
    </div>
    <div
      v-show="!isEnd"
      slot="button-next"
      class="swiper-button-next"
      @click.prevent="next"
    >
      <svg class="swiper-button-svg">
        <use xlink:href="/img/sprites/arrow-swipe.svg#arrow-swipe" />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'

export default {
  name: 'BaseSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    mobileSlidesAmount: {
      type: Number,
      default: 1
    },
    mobileSpaceBetween: {
      type: Number,
      default: 20
    },
    breakpoints: {
      type: Object,
      default () {
        return {}
      }
    },
    swiperOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    pagination: {
      type: Boolean,
      default: false
    },
    observeParents: {
      type: Boolean,
      default: true
    },
    observer: {
      type: Boolean,
      default: true
    },
    touchMove: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isBeginning: true,
      isEnd: true,
      progress: 0,
      activeSlide: 0,

      swiperOption: {
        ...this.swiperOptions,
        slidesPerView: this.mobileSlidesAmount,
        spaceBetween: this.mobileSpaceBetween,
        observer: this.observer,
        observeParents: this.observeParents,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: this.breakpoints
      }
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'mobile'
    })
  },
  watch: {
    touchMove () {
      if (this.touchMove) {
        this.swiper.allowTouchMove = true
      } else {
        this.swiper.allowTouchMove = false
      }
    }
  },
  methods: {
    next () {
      this.swiper.slideNext(300)
    },
    prev () {
      this.swiper.slidePrev(300)
    },
    getPosition () {
      this.isBeginning = this.swiper.isBeginning
      this.isEnd = this.swiper.isEnd
      this.activeSlide = this.swiper.activeIndex

      if (this.isBeginning && this.isEnd) {
        this.swiper.allowTouchMove = false
      }
    },
    hoverPagination (slide) {
      if (!this.isMobile) {
        this.swiper.slideTo(slide, 0)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.swiper-container {
  .swiper-button-next,
  .swiper-button-prev {
    &::after {
      content: ''
    }
  }
}
</style>

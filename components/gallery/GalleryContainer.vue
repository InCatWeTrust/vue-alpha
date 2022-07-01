<template>
  <div class="galleryContainer">
    <div
      v-if="!isMobile"
      class="list"
    >
      <div class="wrapper">
        <BaseSwiper
          :items="images"
          :breakpoints="sideBreakpoints"
          :swiper-options="swiperSideOptions"
          :mobile-slides-amount="3"
          class="gallerySideSwiper"
        >
          <template #default="slotProps">
            <div
              class="img"
              :class="{'active': slotProps.item === img}"
              @click.prevent="changeImg(slotProps.item)"
            >
              <img :src="slotProps.item" alt="">
            </div>
          </template>
        </BaseSwiper>
      </div>
    </div>
    <div class="content">
      <GallerySwiper
        v-if="isMobile"
        :images="images"
      />
      <GalleryZoom
        v-else
        :img="img"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseSwiper from '../swiper/BaseSwiper.vue'
import GallerySwiper from './GallerySwiper.vue'
import GalleryZoom from './GalleryZoom.vue'
import { gallerySideBreakpoints } from '../../data/swiper/swiperBreakpoints'
import { gallerySideOptions } from '../../data/swiper/swiperOptions'

export default {
  name: 'GalleryContainer',
  components: {
    BaseSwiper,
    GallerySwiper,
    GalleryZoom
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      sideBreakpoints: gallerySideBreakpoints,
      swiperSideOptions: gallerySideOptions,
      currentImg: null
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'mobile'
    }),

    img () {
      return this.currentImg ? this.currentImg : this.images[0]
    }
  },
  methods: {
    changeImg (img) {
      this.currentImg = img
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.galleryContainer {
  .list {
    position: relative;
    padding: 30px 20px;

    .wrapper {
      height: 100%;
      overflow: hidden;

      .gallerySideSwiper {
        height: 100%;

        .img {
          overflow: hidden;
          height: 100%;
          position: relative;
          border: 2px solid $white;
          cursor: pointer;
          transition-property: border-color;
          transition-duration: 200ms;
          transition-timing-function: ease-in-out;

          &:hover {
            border-color: $grey;
          }

          &.active {
            border-color: $brandColor;
          }

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
            width: 100%;
          }
        }

        .swiper-button-next,
        .swiper-button-prev {
          left: unset;
          right: 50%;

          &::after {
            content: '';
          }

          .swiper-button-svg {
            fill: $brandColor;
            transition-property: fill;
            transition-duration: 200ms;
            transition-timing-function: ease-in-out;
          }

          &:hover {
            .swiper-button-svg {
              fill: $lightBlue;
            }
          }
        }

        .swiper-button-next {
          bottom: -10px;
          top: unset;
          transform: translateX(50%) rotate(-90deg);
        }

        .swiper-button-prev {
          bottom: unset;
          top: 10px;
          transform: translateX(50%) rotate(90deg);
        }
      }
    }
  }

}
</style>

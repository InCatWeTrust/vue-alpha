<template>
  <div
    id="manual-preview"
    :class="{
      'load': loading
    }"
  >
    <div
      v-if="!loading && !manual"
      class="not-found"
    >
      <span>
        Выберите мануал для предпросмотра
      </span>
      <button
        @click.prevent="changeTab(1)"
      >
        Посмотреть мануалы
      </button>
    </div>
    <BasePreloader
      v-if="loading"
      background-color="rgba(246, 246, 246, 0.7)"
      color="#ff9838"
      :preloader-size="60"
      :z-index="8"
    />
    <transition name="manualTitleAnimation">
      <div
        v-if="componentDidMount && manual"
        class="top-title"
      >
        <span>
          {{ manual.title }}
        </span>
      </div>
    </transition>
    <transition name="manualGalleryAnimation">
      <div
        v-if="componentDidMount && manual"
        class="manual-gallery"
      >
        <GalleryContainer
          :images="imagesUrls"
          class="manual-gallery-container"
        />
      </div>
    </transition>
    <transition name="manualAboutAnimation">
      <ManualAbout
        v-if="componentDidMount && manual"
        class="manual-about"
        :manual="manual"
      />
    </transition>
  </div>
</template>

<script>
import eventBus from '../../../eventBus'
import GalleryContainer from '../../gallery/GalleryContainer.vue'
import ManualAbout from './ManualAbout.vue'
import BasePreloader from '../../BasePreloader.vue'

export default {
  name: 'ManualPreview',
  components: {
    GalleryContainer,
    ManualAbout,
    BasePreloader
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    manual: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      componentDidMount: false
    }
  },
  computed: {
    imagesUrls () {
      return this.manual.images.map(item => item.name)
    }
  },
  mounted () {
    this.componentDidMount = true
  },
  methods: {
    changeTab (id) {
      eventBus.$emit('top-tab-change', id)
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

#manual-preview {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  align-items: flex-start;
  gap: 20px;

  &.load {
    min-height: 200px;
  }

  .not-found {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: $white;
    border-radius: 10px;
    padding: 10px;

    span {
      display: inline-block;
      margin-right: 20px;
      font-size: 18px;
      color: $brandColor;
    }

    button {
      padding: 5px 15px;
      background-color: $brandColor;
      color: $black;
      border: none;
      border-radius: 10px;
      transition: background-color 200ms ease-in-out;

      &:hover {
        background-color: $blue;;
      }
    }
  }

  .top-title {
    grid-column: span 12;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.2;
    color: $brandColor;
    background-color: $white;
    border-radius: 10px;
    box-shadow: $smallShadow;
  }

  .manual-gallery {
    position: relative;
    grid-column: span 6;
    min-height: 1000px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: $smallShadow;

    .manual-gallery-container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: $white;

      .zoom-img {
        object-fit: contain;
      }

      .list {
        width: 100%;
        height: 25%;
        order: 1;
      }

      .content {
        width: 100%;
        height: 75%;
        order: 0;
      }

      .swiper-button-next,
      .swiper-button-prev {
        bottom: unset;
        top: 50%;
        margin-top: 0;
        width: 40px;
        height: 40px;
        padding: 5px;
        border: 1px solid $white;
        border-radius: 5px;
        background-color: $lightGrey;
      }

      .swiper-button-next {
        right: 0;
        transform: translateY(-50%) rotate(180deg);
      }

      .swiper-button-prev {
        left: 0;
        transform: translateY(-50%) rotate(0);
      }

      @media (max-width: 1024px) {
        .content {
          height: 100%;
        }
      }
    }
  }

  .manual-about {
    grid-column: span 6;
  }

  @media (max-width: 1024px) {
    .manual-gallery {
      min-height: 600px;
    }
  }

  @media (max-width: 768px) {
    .manual-gallery {
      grid-column: span 12;
      min-height: 400px;
    }

    .manual-about {
      grid-column: span 12;
    }
  }
}

.manualTitleAnimation-enter-active, .manualTitleAnimation-leave-active {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}
.manualTitleAnimation-enter, .manualTitleAnimation-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.manualGalleryAnimation-enter-active, .manualGalleryAnimation-leave-active {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-delay: 200ms;
  transition-timing-function: ease-in-out;
}
.manualGalleryAnimation-enter, .manualGalleryAnimation-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.manualAboutAnimation-enter-active, .manualAboutAnimation-leave-active {
  transition-property: opacity, transform;
  transition-duration: 500ms;
  transition-delay: 400ms;
  transition-timing-function: ease-in-out;
}
.manualAboutAnimation-enter, .manualAboutAnimation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

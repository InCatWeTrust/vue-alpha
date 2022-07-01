<template>
  <div
    id="gallery"
    @click.prevent="closeGallery"
  >
    <div
      v-if="video"
      class="gallery-video"
    >
      <iframe
        width="560"
        height="315"
        :src="video"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
      />
    </div>
    <div class="gallery-container">
      <div
        v-if="images.length > 0"
        class="gallery-img"
      >
        <img
          class="gallery-current-img"
          :src="currentImg"
        >
      </div>
      <div
        v-if="images.length > 0"
        class="gallery-count"
      >
        {{ currentImgCount }} из {{ images.length }}
      </div>
      <GalleryList
        v-if="images.length > 0"
        :images="images"
        :active="currentImgCount"
      />
    </div>
    <div
      v-if="images.length > 0"
      class="gallery-navigation"
    >
      <div class="prev" @click.stop="prev">
        <svg>
          <use xlink:href="/img/sprites.svg#arrow" />
        </svg>
      </div>
      <div class="next" @click.stop="next">
        <svg>
          <use xlink:href="/img/sprites.svg#arrow" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryList from '../gallery/GalleryList.vue'
import eventBus from '../../eventBus'

export default {
  name: 'GalleryComponent',
  components: {
    GalleryList
  },
  props: {
    images: {
      default: []
    },
    video: {
      default: ''
    }
  },
  data () {
    return {
      currentImgCount: 1
    }
  },
  created () {
    eventBus.$on('pick-img', index => { this.currentImgCount = index })
  },
  computed: {
    currentImg () {
      return this.images.length > 0 ? this.images[this.currentImgCount - 1] : ''
    }
  },
  methods: {
    next () {
      if (this.currentImgCount < this.images.length) {
        this.currentImgCount += 1
      }
    },
    prev () {
      if (this.currentImgCount > 1) {
        this.currentImgCount -= 1
      }
    },
    closeGallery () {
      eventBus.$emit('show-gallery', false)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

#gallery {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($almostBlack, 0.7);
  z-index: 40;
  cursor: zoom-out;
  overflow: auto;
}

.gallery-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100px;
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 20px;
}

.gallery-video {
  z-index: 3;
  max-width: 90%;

  iframe {
    width: 100%;
  }
}

.gallery-img {
  position: relative;
  width: 100%;
  height: 70%;
}

.gallery-current-img {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.gallery-count {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  color: $white;
}

.gallery-navigation {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .next,
  .prev {

    svg {
      width: 60px;
      height: 60px;
      fill: $white;
      transition-property: fill;
      transition-duration: 200ms;
      transition-timing-function: ease;
      cursor: pointer;
    }

    &:hover svg {
      fill: $brandColor;
    }
  }

  .next {
    transform: rotate(90deg);
  }

  .prev {
    transform: rotate(-90deg);
  }
}

@media (max-width: 1024px) {

.gallery-container {
  left: 10px;
  right: 10px;
  padding: 20px 0 0;

  .gallery-img {
    img {
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.gallery-navigation {
  top: 35%;
  padding: 0;

  .next,
  .prev {

    svg {
      width: 35px;
      height: 35px;
      filter: drop-shadow(0 0 3px $brandColor);
      transition-property: fill;
      transition-duration: 100ms;
      transition-timing-function: ease;
    }

    &:hover svg {
      fill: $white;
    }

    &:active svg {
      fill: $brandColor;
    }
  }
}

}
</style>

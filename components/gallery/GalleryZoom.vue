<template>
  <div class="zoom-img-container">
    <img
      :src="img"
      alt=""
      class="zoom-img"
    >
    <img
      :src="img"
      alt=""
      class="zoom-overlay"
    >
    <div class="zoom-cursor" />
  </div>
</template>

<script>
import { getCoords } from '../../helpers/getCoords'

export default {
  name: 'GalleryZoom',
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      globalX: 0,
      globalY: 0,
      zoom: 3,
      getCoords
    }
  },
  mounted () {
    this.$nextTick(function () {
      const imgContainer = document.querySelector('.zoom-img-container')

      if (imgContainer) {
        document.addEventListener('mousemove', this.setGlobalCoords)
        imgContainer.addEventListener('mousemove', this.imgZoom)
        imgContainer.addEventListener('mouseleave', this.imgZoomOut)
      }
    })
  },
  beforeDestroy () {
    const imgContainer = this.$el.querySelector('.zoom-img-container')

    if (imgContainer) {
      document.removeEventListener('mousemove', this.setGlobalCoords)
      imgContainer.removeEventListener('mousemove', this.imgZoom)
      imgContainer.removeEventListener('mouseleave', this.imgZoomOut)
    }
  },
  methods: {
    setGlobalCoords (e) {
      this.globalX = e.pageX
      this.globalY = e.pageY
    },
    imgZoom () {
      const img = document.querySelector('.zoom-img')
      const overlay = document.querySelector('.zoom-overlay')
      const cursor = document.querySelector('.zoom-cursor')
      const imgWidth = img.offsetWidth
      const imgHeight = img.offsetHeight
      const cursorWidth = cursor.offsetWidth
      const cursorHeight = cursor.offsetHeight
      let posX = this.globalX -
        this.getCoords(img).left -
        cursorWidth / 2
      let posY = this.globalY -
        this.getCoords(img).top -
        cursorHeight / 2

      if (posX < 0) {
        posX = 0
      }
      if (posX > imgWidth - cursorWidth) {
        posX = imgWidth - cursorWidth
      }
      if (posY < 0) {
        posY = 0
      }
      if (posY > imgHeight - cursorHeight) {
        posY = imgHeight - cursorHeight
      }

      cursor.style.width = `${imgWidth / this.zoom}px`
      cursor.style.height = `${imgHeight / this.zoom}px`

      cursor.style.left = `${posX}px`
      cursor.style.top = `${posY}px`
      cursor.style.display = 'block'

      posX *= this.zoom
      posY *= this.zoom
      overlay.style.width = `${imgWidth * this.zoom}px`
      overlay.style.height = `${imgHeight * this.zoom}px`
      overlay.style.left = `-${posX}px`
      overlay.style.top = `-${posY}px`
      overlay.style.display = 'block'
    },
    imgZoomOut () {
      const cursor = document.querySelector('.zoom-cursor')
      const overlay = document.querySelector('.zoom-overlay')

      cursor.style.display = 'none'
      overlay.style.display = 'none'
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.zoom-img-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid $white;
  transition-property: border-color, box-shadow;
  transition-duration: 300ms;
  transition-timing-function: ease;

  &:hover {
    border-color: $brandColor;
    box-shadow: 0 0 10px $grey;
  }

  .zoom-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .zoom-cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    display: none;
    pointer-events: none;
    z-index: 3;
  }

  .zoom-overlay {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    display: none;
    z-index: 2;
    pointer-events: none;
  }
}
</style>

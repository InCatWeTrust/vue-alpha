<template>
  <div class="garage-content garage-about">
    <div class="block">
      <h2 class="top-title">
        Поставить в Гараж
      </h2>
      <p class="top-desc">
        Выберите, какая техника будет стоят у Вас в Гараже
      </p>
    </div>
    <div class="block with-img">
      <h2 class="title">
        Добавить технику
      </h2>
      <p class="desc">
        По заданным характеристикам
      </p>
      <a
        href="#"
        class="add-button"
        @click.prevent="changeTab(3)"
      >
        <svg>
          <use xlink:href="/img/garage.svg#garage" />
        </svg>
        Добавить технику
      </a>
      <img src="/img/garage-tractor.webp" alt="спецтехника">
    </div>
  </div>
</template>

<script>
import eventBus from '../../eventBus'

export default {
  name: 'GarageAbout',
  methods: {
    changeTab (id) {
      eventBus.$emit('top-tab-change', id)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.garage-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .block {
    position: relative;
    width: 500px;
    padding: 20px 30px;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 3px 3px 10px $lightGrey;

    &:not(:last-child) {
      margin-bottom: 30px;
    }

    &.with-img {
      padding-right: 200px;

      img {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 125px;
        height: 125px;
        object-fit: contain;
      }
    }
  }
}

.garage-about {
  .top-title {
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 500;
  }

  .top-desc {
    font-size: 18px;
    color: $greyText;
  }

  .title {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
  }

  .desc {
    margin-bottom: 15px;
    font-size: 16px;
    color: $greyText;
  }

  .add-button {
    display: inline-block;
    position: relative;
    padding: 15px 45px 15px 25px;
    font-size: 18px;
    color: $almostBlack;
    border-top: 1px solid $almostBlack;
    border-bottom: 1px solid $almostBlack;
    overflow: hidden;
    transition-property: color, border-color;
    transition-duration: 300ms;
    transition-timing-function: ease;
    z-index: 1;

    &:hover {
      color: $brandColor;
      border-color: $brandColor;

      svg {
        fill: $brandColor;
      }
    }

    &:hover::after,
    &:hover::before {
      transform: translateX(0);
    }

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateX(102%);
      z-index: -1;
    }

    &::after {
      background-color: $almostBlack;
      transition-property: transform;
      transition-duration: 200ms;
      transition-delay: 100ms;
      transition-timing-function: ease;
    }

    &::before {
      background-color: $brandColor;
      transition-property: transform;
      transition-duration: 200ms;
      transition-timing-function: ease;
      z-index: -2;
    }

    svg {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 20px;
      height: 20px;
      fill: $almostBlack;
      transform: translate(0, -50%);
      transition-property: fill;
      transition-duration: 300ms;
      transition-timing-function: ease;
    }
  }
}

@media (max-width: 768px) {
  .garage-about {
    .block {
      width: 100%;
      padding: 15px;

      .top-title {
        font-size: 18px;
      }

      .top-desc {
        font-size: 14px;
      }
    }

    .with-img {
      padding-right: 80px !important;

      .title {
        font-size: 18px;
      }

      .desc {
        font-size: 14px;
      }

      .add-button {
        padding: 8px 35px 10px 10px;
        font-size: 14px;

        svg {
          width: 18px;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .garage-about {
    .with-img {
      img {
        bottom: unset !important;
        top: 10px !important;
        right: 10px !important;
        width: 75px !important;
        height: 75px !important;
      }
    }
  }
}
</style>

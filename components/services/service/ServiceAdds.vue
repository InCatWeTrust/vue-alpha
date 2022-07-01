<template>
  <ServicesListItem :item="item">
    <div class="main-service-adds">
      <div class="img">
        <img src="/img/test/search-page.png" alt="">
      </div>
      <div class="title">
        <h2>
          Объявления
        </h2>
      </div>
      <div class="description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eum commodi atque velit laudantium enim quisquam quibusdam! Eos repudiandae quam nesciunt?
        </p>
      </div>
    </div>
  </ServicesListItem>
</template>

<script>
import ServicesListItem from '../ServicesListItem.vue'

export default {
  name: 'ServiceAdds',
  components: {
    ServicesListItem
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../../scss/_variables.scss';

.main-service-adds {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-flow: dense;
  gap: 20px;
  position: absolute;
  top: 12px;
  right: 12px;
  bottom: 12px;
  left: 12px;
  border-radius: 10px;

  .img,
  .title,
  .description {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px $grey;
  }

  .img {
    grid-column: span 6;
    grid-row: span 3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    grid-column: span 6;
    grid-row: span 1;
    padding: 10px;
    font-weight: 500;
    color: $purple;
    background-color: $white;
  }

  .description {
    grid-column: span 6;
    grid-row: span 2;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    background-color: $white;
    color: $blackText;
  }
}
</style>

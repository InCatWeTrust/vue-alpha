<template>
  <header id="header">
    <router-link
      :to="{name: 'main'}"
      class="header-logo"
    >
      <img src="/img/alpha.webp" alt="alpha">
    </router-link>
    <div class="header-title">
      <span>A</span>
      <span>l</span>
      <span>p</span>
      <span>h</span>
      <span>a</span>
    </div>
    <BaseAccount :user-loaded="userLoaded" />
  </header>
</template>

<script>
import BaseAccount from '../components/BaseAccount.vue'

export default {
  name: 'HeaderComponent',
  components: {
    BaseAccount
  },
  props: [
    'userLoaded'
  ]
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

#header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 30px;
  text-align: center;
  font-size: 40px;
  height: 70px;
  background-color: $blackText;
  border-bottom: 3px solid $darkGrey;
  z-index: 10;
}

.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
}

.header-title {
  display: flex;
  margin-right: auto;
  color: $brandColor;
  font-size: 24px;
  font-weight: 500;

  span {
    text-transform: uppercase;
  }

  span:not(:last-child) {
    margin-right: 5px;
  }
}

@media (max-width: 1024px) {

#header {
  height: 50px;
}

.header-logo {
  margin-right: 5px;

  img {
    width: 40px;
    height: 40px;
  }
}

.header-title {
  font-size: 18px;

  span:not(:last-child) {
    margin-right: 2px;
  }
}

}
</style>
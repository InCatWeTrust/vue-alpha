<template>
  <div id="page-preloader">
    <img src="/img/crane-hook.svg" alt="Крюк" class="hook">
  </div>
</template>

<script>
export default {
  name: 'PagePreloader'
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

#page-preloader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $lightGrey;
  z-index: 9;

  .hook {
    position: absolute;
    top: 66px;
    left: 10vw;
    width: 70px;
    filter: drop-shadow(-10px 9px 4px $grey);
    animation: hookmove 2000ms ease alternate infinite;
  }
}

@keyframes hookmove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(80vw);
  }
}
</style>

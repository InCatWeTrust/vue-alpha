<template>
  <iframe
    src="/pdf/CASE 695ST - полный сервис на АКПП.pdf"
    frameborder="0"
    class="iframe-pdf"
  />
</template>

<script>
export default {
  name: 'BasePdf',
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.iframe-pdf {
  width: 100%;
  height: 1000px;
}
</style>

<template>
  <footer id="footer">
    <span>
      © 2022 - Alpha
    </span>
    <a href="#">
      Контакты
    </a>
    <a href="#">
      Пользовательское соглашение
    </a>
    <a href="#">
      Политика конфиденциальности
    </a>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  text-align: center;
  height: 30px;
  font-size: 12px;
  background-color: $footer;
  color: $lightGrey;
  z-index: 9;
}

#footer span {
  margin-right: 20px;
}

#footer a {
  padding: 0 20px;
  color: $greyText;
  transition-property: color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

#footer a:not(:last-child) {
  border-right: 1px solid $greyText;
}

#footer a:hover {
  color: $lightGrey;
}

@media (max-width: 1024px) {

#footer {
  flex-wrap: wrap;

  span {
    margin-right: 10px;
    font-size: 10px;
  }

  a {
    padding: 0 3px;
    font-size: 10px;
  }
}

}
</style>
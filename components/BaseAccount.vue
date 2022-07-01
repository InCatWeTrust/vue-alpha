<template>
  <div class="account-wrapper">
    <div class="account-login">
      <button
        v-if="!xToken"
        :disabled="!userLoaded"
        @click.prevent="openLoginPopup"
      >
        Войти
      </button>
    </div>
    <div class="account-register">
      <button
        v-if="!xToken"
        :disabled="!userLoaded"
        @click.prevent="openRegisterPopup"
      >
        Регистрация
      </button>
    </div>
    <div
      v-if="xToken"
      class="account-logout"
      :class="{'disabled': exitProcess}"
      @click.prevent="logout"
    >
      <button>
        Выйти
      </button>
      <img src="/img/logout.svg" class="account-logout-img" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import eventBus from '../eventBus'

export default {
  name: 'BaseAccount',
  props: [
    'userLoaded'
  ],
  data () {
    return {
      exitProcess: false
    }
  },
  computed: {
    ...mapGetters({
      xToken: 'xToken'
    })
  },
  methods: {
    ...mapActions({
      deleteUser: 'deleteUser'
    }),

    openLoginPopup () {
      eventBus.$emit('login-popup', true)
    },
    openRegisterPopup () {
      eventBus.$emit('register-popup', true)
    },
    logout () {
      const context = this
      this.exitProcess = true

      this.deleteUser()
        .then((res) => {
          if (context.$route.name !== 'main') {
            context.$router.push({name: 'main'})
          }
        })
        .finally(() => {
          this.exitProcess = false
        })
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.account-wrapper {
  display: flex;
  align-items: center;
}

.account-login {
  button {
    position: relative;
    display: flex;
    padding: 10px 20px;
    margin-right: 15px;
    border: 2px solid $white;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    background: transparent;
    color: $white;
    cursor: pointer;
    overflow: hidden;
    transition-property: color;
    transition-duration: 200ms;
    transition-timing-function: ease;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $white;
      transform: translateY(100%);
      z-index: -1;
      transition-property: transform;
      transition-duration: 200ms;
      transition-timing-function: ease;
    }

    &:hover {
      color: $blackText;

      &::after {
        transform: translateY(0);
      }
    }
  }
}

.account-register {
  button {
    position: relative;
    display: flex;
    padding: 10px 20px;
    border: 2px solid $brandColor;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    background-color: $brandColor;
    color: $blackText;
    cursor: pointer;
    overflow: hidden;
    transition-property: background-color, color;
    transition-duration: 200ms;
    transition-timing-function: ease;

    &:hover {
      color: $white;
      background-color: transparent;
    }
  }
}

.account-logout {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  &:hover,
  &:focus {
    button {
      border-color: transparent;
    }

    .account-logout-img {
      transform: translate(8px, -50%);
    }
  }

  &.disabled {
    pointer-events: none;
    animation: logout 300ms ease infinite alternate;
  }

  button {
    padding: 8px 36px 8px 16px;
    border: 2px solid $white;
    border-radius: 10px;
    font-size: 16px;
    letter-spacing: 1px;
    background: transparent;
    color: $white;
    transition-property: border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
    pointer-events: none;
  }

  .account-logout-img {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    width: 18px;
    height: 18px;
    transition-property: transform;
    transition-duration: 200ms;
    transition-timing-function: ease;
    pointer-events: none;
  }
}

@keyframes logout {
  0% {
    background-color: rgba($white, 0.1);
  }
  100% {
    background-color: rgba($white, 0.5);
  }
}
</style>

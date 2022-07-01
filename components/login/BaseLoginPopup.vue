<template>
  <div class="login-popup" @mousedown.self="closePopup">
    <div class="login-background" />
    <div class="login-form-container">
      <form class="login-form">
        <h2 class="login-title">
          Вход
        </h2>
        <BaseFormText
          v-model="formData.email"
          title="Email"
          :error="formErrors.email"
          type="email"
          class="login__label"
        />
        <BaseFormText
          v-model="formData.password"
          title="Пароль"
          :error="formErrors.password"
          type="password"
          class="login__label"
        />
        <button
          :disabled="formLoading"
          class="login__button login__sign-in-button"
          @click.prevent="login"
        >
          <BasePreloader
            v-if="formLoading"
            :preloader-size="30"
            color="#ff9838"
            background-color="#6b6b6b"
          />
          Войти
        </button>
        <span class="login__question">
          Нет учётной записи?
        </span>
        <button
          href="#"
          class="login__button login__register-button"
          @click.prevent="changePopup"
          :disabled="formLoading"
        >
          Зарегистрироваться
        </button>
        <button
          href="#"
          class="login__forget"
          :disabled="formLoading"
        >
          Забыли пароль? Восстановить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseFormText from '../form/BaseFormText.vue'
import BasePreloader from '../BasePreloader.vue'
import eventBus from '../../eventBus'

export default {
  name: 'LoginPopup',
  components: {
    BaseFormText,
    BasePreloader
  },
  data () {
    return {
      formData: {},
      formErrors: {},

      formLoading: false
    }
  },
  mounted () {
    const popup = this.$el
    const chartContainer = this.$el.querySelector('.login-form-container')

    if (popup.offsetHeight <= 700) {
        chartContainer.style.top = '50px'
        chartContainer.style.transform = 'translateY(0)'
      }

    window.addEventListener('resize', () => {
      if (popup.offsetHeight <= 700) {
        chartContainer.style.top = '50px'
        chartContainer.style.transform = 'translateY(0)'
      } else {
        chartContainer.style.top = '50%'
        chartContainer.style.transform = 'translateY(-50%)'
      }
    })
  },
  methods: {
    ...mapActions({
      getUser: 'getUser'
    }),

    closePopup () {
      eventBus.$emit('login-popup', false)
    },
    changePopup () {
      eventBus.$emit('login-popup', false)
      eventBus.$emit('register-popup', true)
    },
    async login () {
      this.formErrors = {}

      if (this.validate()) {
        this.formLoading = true

        try {
          await axios.get('/sanctum/csrf-cookie')

          const response = await axios.post('/login', {}, {
            params: {
              email: this.formData.email,
              password: this.formData.password
            }
          })

          localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])

          this.getUser()

          eventBus.$emit('login-popup', false)
        } catch(err) {
          for (const item in err.response.data.errors) {
            this.formErrors[item] = err.response.data.errors[item][0]
          }
        } finally {
          this.formLoading = false
        }
      }
    },
    validate () {
      const regexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      let errors = 0

      if (!this.formData.email) {
        this.formErrors.email = 'Поле "Email" обязательно для заполнения'
        errors += 1
      } else if (!this.formData.email.match(regexp)) {
        this.formErrors.email = 'Неверный формат электронной почты'
        errors += 1
      }

      if (!this.formData.password) {
        this.formErrors.password = 'Введите пароль'
        errors += 1
      }

      if (errors > 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.login-popup {
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($blackText, 0.6);
  z-index: 55;
  overflow: auto;
}

.login-form-container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  padding: 30px;
  border-radius: 20px;
  background-color: $almostBlack;
  box-shadow: 0 0 20px $almostBlack;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-title {
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 24px;
  color: $almostWhite;
}

.login__label {
  width: 100%;
  margin-bottom: 30px;
}

.login__label .form__value {
  color: $lightGreyText;
}

.login__label input {
  color: $white;
}

.login__button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 3px;
  padding: 15px 12px;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  transform: translateY(-5px);
  transition-property: filter, transform;
  transition-duration: 200ms;
  transition-timing-function: ease;
  overflow: hidden;
}

.login__button:not(:disabled):hover,
.login__button:not(:disabled):focus {
  filter: brightness(1.1);
}

.login__sign-in-button {
  background: linear-gradient(to bottom, $brandColor, rgba($brandColor, 0.5));
}

.login__question {
  margin-bottom: 15px;
  font-size: 14px;
  color: $lightGreyText;
}

.login__register-button {
  margin-bottom: 30px;
  padding: 15px;
  border: 2px solid $brandColor;
  color: $brandColor;
  background: transparent;
}

.login__forget {
  font-size: 14px;
  background: transparent;
  border: none;
  color: $lightGreyText;
  transition-property: color;
  transition-duration: 200ms;
  transition-timing-function: ease;
}

.login__forget:not(:focus):hover {
  color: $almostWhite;
}

.login__forget:focus {
  color: $brandColor;
}
</style>

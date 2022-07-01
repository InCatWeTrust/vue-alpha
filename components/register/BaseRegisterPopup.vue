<template>
  <div class="register-popup" @mousedown.self="closePopup">
    <div class="register-background" />
    <div class="register-form-container">
      <form class="register-form">
        <h2 class="register-title">
          Регистрация
        </h2>
        <BaseFormText
          v-model="formData.name"
          title="Имя"
          :error="formErrors.name"
          type="text"
          class="register__label"
        />
        <BaseFormText
          v-model="formData.email"
          title="Email"
          :error="formErrors.email"
          type="email"
          class="register__label"
        />
        <BaseFormText
          v-model="formData.password"
          title="Пароль"
          :error="formErrors.password"
          type="password"
          class="register__label"
        />
        <BaseFormText
          v-model="formData.password_confirmation"
          title="Повторите пароль"
          :error="formErrors.password_confirmation"
          type="password"
          class="register__label"
        />
        <button
          :disabled="formLoading"
          class="register__button register__sign-in-button"
          @click.prevent="register"
        >
          <BasePreloader
            v-if="formLoading"
            :preloader-size="30"
            color="#ff9838"
            background-color="#6b6b6b"
          />
          Зарегистрироваться
        </button>
        <span class="register__question">
         Уже есть учётная запись?
        </span>
        <button
          href="#"
          class="register__button register__register-button"
          @click.prevent="changePopup"
          :disabled="formLoading"
        >
          Войти
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
  name: 'registerPopup',
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
    const chartContainer = this.$el.querySelector('.register-form-container')

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
      eventBus.$emit('register-popup', false)
    },
    changePopup () {
      eventBus.$emit('register-popup', false)
      eventBus.$emit('login-popup', true)
    },
    async register () {
      this.formErrors = {}

      if (this.validate()) {
        this.formLoading = true

        try {
          axios.get('/sanctum/csrf-cookie')

          const response = await axios.post('/register', {}, {
            params: {
              name: this.formData.name,
              email: this.formData.email,
              password: this.formData.password,
              password_confirmation: this.formData.password_confirmation
            }
          })

          localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])

          this.getUser()

          eventBus.$emit('register-popup', false)
        } catch (err) {
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

      if (!this.formData.name) {
        this.formErrors.name = 'Поле "Имя" обязательно для заполнения'
        errors += 1
      }

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
      } else if (this.formData.password && this.formData.password.length < 8) {
        this.formErrors.password = 'Минимальная длина пароля - 8 символа'
        errors += 1
      } else if (this.formData.password !== this.formData.password_confirmation) {
        this.formErrors.password_confirmation = 'Пароли не совпадают'
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

.register-popup {
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

.register-form-container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  padding: 30px;
  border-radius: 20px;
  background-color: $almostBlack;
  box-shadow: 0 0 20px $almostBlack;
}

.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-title {
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 24px;
  color: $almostWhite;
}

.register__label {
  width: 100%;
  margin-bottom: 30px;
}

.register__label .form__value {
  color: $lightGreyText;
}

.register__label input {
  color: $white;
}

.register__button {
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

.register__button:not(:disabled):hover,
.register__button:not(:disabled):focus {
  filter: brightness(1.1);
}

.register__sign-in-button {
  background: linear-gradient(to bottom, $brandColor, rgba($brandColor, 0.5));
}

.register__question {
  margin-bottom: 15px;
  font-size: 14px;
  color: $lightGreyText;
}

.register__register-button {
  margin-bottom: 30px;
  padding: 15px;
  border: 2px solid $brandColor;
  color: $brandColor;
  background: transparent;
}
</style>

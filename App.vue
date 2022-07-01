<template>
  <div id="content">
    <HeaderComponent
      :user-loaded="userLoaded"
    />
    <SideBar
      v-if="$route.name !== 'main'"
      :mobile="mobile"
    />
    <transition name="page-preloader">
      <div v-if="!userLoaded" class="page-preloader-container">
        <PagePreloader
          :preloader-size="50"
          color="#ff9838"
          background-color="#363636"
        />
      </div>
    </transition>
    <router-view
      v-if="userLoaded"
      :mobile="mobile"
    />
    <FooterComponent />
    <transition name="loginPopup">
      <BaseLoginForm v-if="loginPopup" />
    </transition>
    <transition name="registerPopup">
      <BaseRegisterForm v-if="registerPopup" />
    </transition>
    <transition name="chartPopup">
      <ChartPopup v-if="chartPopup" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import SideBar from './components/sidebar/SideBar.vue'
import BaseLoginForm from './components/login/BaseLoginPopup.vue'
import BaseRegisterForm from './components/register/BaseRegisterPopup.vue'
import ChartPopup from './components/charts/ChartPopup.vue'
import PagePreloader from './components/BasePreloader.vue'
import eventBus from './eventBus'
import { userLoaded } from './auth'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SideBar,
    BaseLoginForm,
    BaseRegisterForm,
    ChartPopup,
    PagePreloader
  },
  data () {
    return {
      loginPopup: false,
      registerPopup: false,
      chartPopup: false,

      userLoaded: false,
      mobile: false
    }
  },
  created () {
    const xToken = localStorage.getItem('x_xsrf_token')

    if (xToken) {
      this.getUser()
        .finally(() => {
          this.userLoaded = true
        })
    } else {
      this.userLoaded = true
      userLoaded()

      if (this.$route.name !== 'main') {
          this.$router.push({name: 'main'})
      }
    }

    eventBus.$on('login-popup', (isOpen) => { this.loginPopup = isOpen })
    eventBus.$on('register-popup', (isOpen) => { this.registerPopup = isOpen })
    eventBus.$on('chart-popup', (isOpen) => { this.chartPopup = isOpen })
  },
  mounted () {
    if (window.innerWidth <= 1024) {
      this.mobile = true
      this.setIsMobile(true)
    }

    this.$nextTick(function () {
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
          this.mobile = true
          this.setIsMobile(true)
        } else {
          this.mobile = false
          this.setIsMobile(false)
        }
      })
    })
  },
  updated () {
    this.getXToken()
  },
  methods: {
    ...mapMutations({
      getXToken: 'GET_X_TOKEN',
      setIsMobile: 'UPDATE_IS_MOBILE'
    }),
    ...mapActions({
      getUser: 'getUser'
    })
  }
}
</script>

<style lang="scss">
.page-preloader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
}

.content-container {
  padding: 70px 0 30px 100px;
}

.loginPopup-enter-active, .loginPopup-leave-active {
  transition: opacity .3s ease;
}
.loginPopup-enter, .loginPopup-leave-to {
  opacity: 0;
}

.registerPopup-enter-active, .registerPopup-leave-active {
  transition: opacity .3s ease;
}
.registerPopup-enter, .registerPopup-leave-to {
  opacity: 0;
}

.chartPopup-enter-active, .chartPopup-leave-active {
  transition: opacity .3s ease;
}
.chartPopup-enter, .chartPopup-leave-to {
  opacity: 0;
}

.page-preloader-enter-active, .page-preloader-leave-active {
  transition: opacity .3s ease;
}
.page-preloader-enter, .page-preloader-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {

.content-container {
  padding: 50px 0 30px;
}

}
</style>

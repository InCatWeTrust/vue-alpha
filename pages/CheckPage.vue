<template>
  <main class="main check-page">
    <div class="content-container">
      <div class="content-wrapper">
        <TopService
          :tabs="checkTabs"
          title="Проверка спецтехники"
          :active-tab="activeTab"
        />
        <div class="container">
          <div v-show="activeTab === 1">
            <CheckForm
              :inputs="checkInputs"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CheckForm from '../components/check/CheckForm.vue'
import TopService from '../components/TopService.vue'
import checkTabsData from '../data/top-service/checkTabs'
import checkInputsData from '../data/check'
import eventBus from '../eventBus'

export default {
  name: 'CheckPage',
  components: {
    TopService,
    CheckForm
  },
  data () {
    return {
      activeTab: 1
    }
  },
  computed: {
    checkTabs () {
      return checkTabsData || []
    },
    checkInputs () {
      return checkInputsData
    }
  },
  created () {
    eventBus.$on('top-tab-change', (id) => { this.activeTab = id })
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';

.check-page {
  .content-container {
    padding-bottom: 0;

    .content-wrapper {
      height: calc(100vh - 100px);
      overflow-y: auto;
      background-image: url('/img/background/truck.webp');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .container {
      padding-bottom: 30px;
    }

    .inputs {
      background-color: rgba($white, 0.8);
      box-shadow: 0 0 20px $black;

      .form__input {
        background-color: $white;
        transition-property: border-color, box-shadow;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;

        &:hover {
          border-color: $brandColor;
        }

        &:focus {
          box-shadow: 0 2px 4px $brandColor;
        }
      }
    }
  }
}

@media (max-width: 768px) {
.check-page {
  .content-container {
    .content-wrapper {
      height: calc(100vh - 80px);

      .check-form {
        gap: 20px;

        .inputs {
          grid-column: span 12;

          .title {
            margin-bottom: 10px;
            font-size: 16px;
          }

          .check-title {
            font-size: 16px;
          }

          .check-input {
            margin-bottom: 15px;
          }

          .form__input {
            font-size: 14px;
          }

          .form__value {
            opacity: 0;
          }
        }

        .send {
          grid-column: span 12;

          .send-btn {
            width: 100%;
          }
        }
      }
    }
  }
}
}
</style>

<template>
  <div class="chart-popup">
    <div class="chart-background" @click.prevent="closeChart" />
    <div class="chart-container">
      <BaseChart class="_chart" :styles="myStyles" />
    </div>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
import BaseChart from './BaseChart.vue'

export default {
  name: 'ChartPopup',
  components: {
    BaseChart
  },
  computed: {
    myStyles () {
      return {
        width: '600px',
        height: '600px',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '5px'
      }
    }
  },
  methods: {
    closeChart () {
      eventBus.$emit('chart-popup', false)
    }
  },
  mounted () {
    const popup = this.$el
    const chartContainer = this.$el.querySelector('.chart-container')

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
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

.chart-popup {
  display: flex;
  justify-content: center;
  align-items: baseline;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 55;
  overflow: auto;
}

.chart-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($lightGrey, 0.5);
  z-index: -1;
}

.chart-container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>

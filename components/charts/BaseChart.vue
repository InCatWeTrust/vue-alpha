<script>
import { Line } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  name: 'BaseChart',
  extends: Line,
  computed: {
    ...mapGetters({
      chartData: 'searchChart'
    })
  },
  mounted () {
    this.renderChart({
      labels: this.chartData && this.chartData.labels || [],
      datasets: [{
        label: 'Цена',
        data: this.chartData && this.chartData.data || [],
        backgroundColor: 'rgba(255, 152, 56, 0.3)'
      }]
    })
  }
}
</script>

<style lang="scss">
@import '../../../scss/_variables.scss';

</style>

<template>
  <canvas id="chart"></canvas>
</template>
<script>
import Chart from 'chart.js';

  export default {
    data() {
      return {
        ctx: null,
        chart: null,
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.ctx = document.getElementById('chart').getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: this.data
      });
    }
  }
</script>

<template>
  <v-card
    flat>
    <canvas :id="idChart"></canvas>
  </v-card>
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
      idChart: {
        type: String,
        required: true
      },
      labels: {
        type: Array,
        required: true
      },
      datasets: {
        type: Array,
        required: true
      }
    },
    mounted() {
      this.ctx = document.getElementById(this.idChart).getContext('2d');
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: this.data,
        options: {
          legend: {
            display: true,
            labels: {
              fontFamily: "'Open Sans Condensed', 'sans-serif'",
              fontSize: 14
            }
          },
          tooltips: {
            titleFontFamily: "'Open Sans Condensed', 'sans-serif'",
            bodyFontFamily: "'Open Sans Condensed', 'sans-serif'",
          },
          scales: {
            yAxes: [{
              ticks: {
                fontFamily: "'Open Sans Condensed', 'sans-serif'",
                beginAtZero: true,
              }
            }],
            xAxes: [{
              ticks: {
                fontFamily: "'Open Sans Condensed', 'sans-serif'",
              }
            }]
          }
        }
      });
    },
    watch: {
      labels() {
        this.chart.data.labels = this.labels;
        for (let i = 0; i < this.datasets.length; i ++) {
          this.chart.data.datasets[i] = this.datasets[i];
        }
        this.chart.update();
      }
    }
  }
</script>

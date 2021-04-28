<template>
  <v-card
    outlined>
    <v-toolbar
      color="#404827"
      dark>
      <v-toolbar-title
        class="font-weight-bold text-h4">
        {{ this.title }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <canvas :id="idChart"></canvas>
    </v-card-text>
  </v-card>
</template>
<script>
import Chart from 'chart.js';
import ChartDataLabels  from 'chartjs-plugin-datalabels';

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
      },
      title: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.ctx = document.getElementById(this.idChart).getContext('2d');
      this.chart = new Chart(this.ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: [],
        options: {
          plugins: {
            datalabels: {
              color: '#FFFFFF',
              font: {
                family: "'Open Sans Condensed', 'sans-serif'",
                size: 16,
                weight: 'bold'
              },
              formatter: function(value, context) {
                if (value === 0) {
                  return '';
                }
              }
            }
          },
          legend: {
            display: true,
            labels: {
              fontFamily: "'Open Sans Condensed', 'sans-serif'",
              fontSize: 14
            }
          },
          tooltips: {
            enabled: false,
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

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
  /**
    * @module components/Site/Chart
  */
  import Chart from 'chart.js';
  import ChartDataLabels  from 'chartjs-plugin-datalabels';
  /**
   * @vue-data {Object} ctx - Contexto para poder dibujar las graficas.
   * @vue-data {Object} chart - Instancia de la libreria Chart para poder dibujar la grafica.
   * @vue-data {Object} page - Configura la paginacion de la vista.
   * @vue-prop {String} idChart - Identificador unico para cada grafica dibujada.
   * @vue-prop {Array} labels - Lista de etiquetas ubicadas en las graficas.
   * @vue-prop {Array} datasets - Lista de valores ubicados en las graficas.
   * @vue-prop {String} titulo - Titulo ubicado en el v-toolbar-title.
  */
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
      },
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
              color: '#000000',
              font: {
                family: "'Open Sans Condensed', 'sans-serif'",
                size: 12,
                weight: 'bold'
              },
              anchor: 'end',
              align: 'top',
              formatter: function(value, context) {
                if (value === 0) {
                  return '';
                }
              }
            },
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 30,
                bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontFamily: "'Open Sans Condensed', 'sans-serif'",
              fontSize: 14
            }
          },
          tooltips: {
            enabled: false,
          },
          hover: false,
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
    /**
      * Watch Events:
      * @property {Function} labels - Setea los labels y los actualiza sobre la grafica.
    */
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

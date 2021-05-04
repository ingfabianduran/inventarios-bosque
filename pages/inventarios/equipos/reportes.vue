<template>
  <div>
    <v-row
      align="center">
      <v-col
        cols="12"
        md="5">
        <Form @dataReports="updateDataReports" />
      </v-col>
      <v-col
        cols="12"
        md="7">
        <v-card
          outlined>
          <v-toolbar
            color="#404827"
            dark>
            <v-toolbar-title
              class="font-weight-bold text-h4">
              Tiempo de Uso de los Equipos
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Tabla
              :headers="headersRepUsos"
              :items="itemsRepUsos"
              :total="totalRepUsos" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <Chart idChart="chartOne" :labels="dataChart[0].labels" :datasets="dataChart[0].datasets" title="Distribución de Equipos por Tipo" />
      </v-col>
      <v-col
        cols="12"
        md="6">
        <Chart idChart="chartTwo" :labels="dataChart[1].labels" :datasets="dataChart[1].datasets" title="Distribución de Equipos por Usuario" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12">
        <v-card
          outlined>
          <v-toolbar
            color="#404827"
            dark>
            <v-toolbar-title
              class="font-weight-bold text-h4">
              Cantidad de Equipos por Marca
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <Tabla
              :headers="headersRepMarcas"
              :items="itemsRepMarcas"
              :isPagination="true"
              :total="totalRepMarcas" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import Chart from '~/components/Site/Chart';
  import Tabla from '~/components/Site/MiniTable';
  import Form from '~/components/Inventario/Equipos/FormReport';
  import Loader from '~/components/Site/Loader';
  import moment from 'moment';

  export default {
    middleware: ['auth', 'isCoordinador'],
    head() {
      return {
        title: 'Reporte de Equipos'
      }
    },
    data() {
      return {
        headersRepMarcas: [
          { text: 'Marca', value: 'nombre', sortable: false },
          { text: 'Area Académica y Administrativas', value: 'academico_administrativo', sortable: false },
          { text: 'Servicio al Estudiante', value: 'servicio_estudiante', sortable: false },
          { text: 'Sin Asignar', value: 'sin_asignar', sortable: false },
          { text: 'Total', value: 'total', sortable: false }
        ],
        headersRepUsos: [
          { text: 'Tiempo de Uso', value: 'tiempos', sortable: false },
          { text: 'Area Académica y Administrativas', value: 'porcenteAcaAdm', sortable: false },
          { text: 'Cantidad', value: 'cantidadAcaAdm', sortable: false },
          { text: 'Servicio al Estudiante', value: 'porcentajeServEst', sortable: false },
          { text: 'Cantidad', value: 'cantidadSerEst', sortable: false },
        ],
        itemsRepMarcas: [],
        totalRepMarcas: [],
        itemsRepUsos: [
          { tiempos: 'Equipos con menos de 1 año', porcenteAcaAdm: '2,7%', cantidadAcaAdm: 36, porcentajeServEst: '9,2%', cantidadSerEst: 181 },
          { tiempos: 'Equipos entre 1 y 3 años', porcenteAcaAdm: '15,7%', cantidadAcaAdm: 207, porcentajeServEst: '13,7%', cantidadSerEst: 269 },
          { tiempos: 'Equipos entre 3 y 5 años', porcenteAcaAdm: '8,9%', cantidadAcaAdm: 117, porcentajeServEst: '50,0%', cantidadSerEst: 979 },
          { tiempos: 'Equipos entre 5 y 6 años', porcenteAcaAdm: '20,3%', cantidadAcaAdm: 268, porcentajeServEst: '4,7%', cantidadSerEst: 92 },
          { tiempos: 'Equipos entre 6 y 7 años', porcenteAcaAdm: '20,6%', cantidadAcaAdm: 271, porcentajeServEst: '10,7%', cantidadSerEst: 210 },
          { tiempos: 'Equipos con mas de 7 años', porcenteAcaAdm: '31,8%', cantidadAcaAdm: 419, porcentajeServEst: '11,5%', cantidadSerEst: 226 },
        ],
        totalRepUsos: [],
        dataChart: [
          {
            labels: [],
            datasets: [
              {
                label: 'Areas Académicas y Administrativas',
                data: [],
                backgroundColor: 'rgba(242, 120, 48, 0.6)'
              },
              {
                label: 'Servicio al Estudiante',
                data: [],
                backgroundColor: 'rgba(123, 193, 66, 0.6)'
              },
              {
                label: 'Total',
                data: [],
                backgroundColor: 'rgba(64, 72, 39, 0.6)'
              },
            ],
          },
          {
            labels: [],
            datasets: [
              {
                label: 'Cantidad de Equipos',
                data: [],
                backgroundColor: 'rgba(242, 120, 48, 0.6)'
              }
            ]
          }
        ],
      }
    },
    components: {
      Chart,
      Tabla,
      Form,
      Loader
    },
    async mounted() {
      const dates = {
        fecha_inicio: moment().subtract(5, 'years').format('DD-MM-YYYY'),
        fecha_fin: moment().format('DD-MM-YYYY')
      };
      await this.chartTipoUsuario(dates);
      await this.chartTipoEquipo(dates);
      await this.countWithMarca(dates);
    },
    methods: {
      async chartTipoUsuario(dates) {
        const { data } = await this.$axios.$post('api/reporte/tipousuario', dates);
        this.dataChart[1].labels = data.map((item) => {
          return item.tipo;
        });
        this.dataChart[1].datasets[0].data = data.map((item) => {
          return item.cantidad;
        });
      },
      async chartTipoEquipo(dates) {
        const { data } = await this.$axios.$post('api/reporte/tipoequipo', dates);
        this.dataChart[0].labels = data.map((item) => {
          return item.tipo;
        });
        this.dataChart[0].datasets[0].data = data.map((item) => {
          return item.academico_administrativo;
        });
        this.dataChart[0].datasets[1].data = data.map((item) => {
          return item.servicio_estudiante;
        });
        this.dataChart[0].datasets[2].data = data.map((item) => {
          return item.total;
        });
      },
      async updateDataReports(values) {
        try {
          this.$nuxt.$loading.start();
          await this.chartTipoUsuario(values);
          await this.chartTipoEquipo(values);
          await this.countWithMarca(values);
          setTimeout(() => {
            this.$nuxt.$loading.finish();
          }, 500);
        } catch (error) {
          this.$nuxt.$loading.finish();
        }
      },
      async countWithMarca(dates) {
        const { data } = await this.$axios.$post('api/reporte/marcasequipo', dates);
        const totalData = data.pop();
        this.totalRepMarcas = Object.values(totalData);
        this.itemsRepMarcas = data;
      },
      close() {
        this.$emit('closeModal', false);
      }
    }
  }
</script>

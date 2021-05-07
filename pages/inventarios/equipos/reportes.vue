<template>
  <div>
    <v-row
      align="center">
      <v-col
        cols="12"
        md="4">
        <Form @dataReports="updateDataReports" />
      </v-col>
      <v-col
        cols="12"
        md="8">
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
  import numbro from 'numbro';

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
          { text: 'Marca', value: 'nombre', sortable: false, align: 'center' },
          { text: 'Area Académica y Administrativas', value: 'academico_administrativo', sortable: false, align: 'center' },
          { text: 'Servicio al Estudiante', value: 'servicio_estudiante', sortable: false, align: 'center' },
          { text: 'Sin Asignar', value: 'sin_asignar', sortable: false, align: 'center' },
          { text: 'Total', value: 'total', sortable: false, align: 'center' }
        ],
        itemsRepMarcas: [],
        totalRepMarcas: [],
        headersRepUsos: [
          { text: 'Tiempo de Uso', value: 'tiempos', sortable: false, align: 'center' },
          { text: 'Area Académica y Administrativas', value: 'porcentAcaAdm', sortable: false, align: 'center' },
          { text: 'Cantidad', value: 'cantidadAcaAdm', sortable: false, align: 'center' },
          { text: 'Servicio al Estudiante', value: 'porcentServEst', sortable: false, align: 'center' },
          { text: 'Cantidad', value: 'cantidadSerEst', sortable: false, align: 'center' },
          { text: 'Sin Asignar', value: 'porcentSinAsig', sortable: false, align: 'center' },
          { text: 'Cantidad', value: 'cantidadSinAsig', sortable: false, align: 'center' },
        ],
        itemsRepUsos: [
          { tiempos: 'Equipos con menos de 1 año', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0,  porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 1 y 2 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 3 y 4 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 5 y 6 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos con mas de 7 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
        ],
        totalRepUsos: ['Total', 0, 0, 0, 0, 0, 0],
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
                label: 'Sin Asignar',
                data: [],
                backgroundColor: 'rgba(0, 135, 118, 0.6)'
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
      await this.countWithTiempoUso(dates);
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
          return item.sin_asignar;
        });
        this.dataChart[0].datasets[3].data = data.map((item) => {
          return item.total;
        });
      },
      async updateDataReports(values) {
        try {
          this.$nuxt.$loading.start();
          await this.chartTipoUsuario(values);
          await this.chartTipoEquipo(values);
          await this.countWithMarca(values);
          await this.countWithTiempoUso(values);
          setTimeout(() => {
            this.$nuxt.$loading.finish();
          }, 500);
        } catch (error) {
          this.$nuxt.$loading.finish();
        }
      },
      async countWithMarca(dates) {
        const { data } = await this.$axios.$post('api/reporte/marcasequipo', dates);
        if (data.length > 0) {
          const totalData = data.pop();
          this.totalRepMarcas = Object.values(totalData);
          this.itemsRepMarcas = data;
        } else {
          this.itemsRepMarcas = [];
          this.totalRepMarcas = [];
        }
      },
      async countWithTiempoUso(dates) {
        const { data } = await this.$axios.$post('api/reporte/tiempouso', dates);
        let totalPorcentaje = 0;
        this.resetValuesTiempoUso();

        for (let i = 0; i < data.academico_admin.length; i ++) {
          for (let j = 0; j < this.itemsRepUsos.length; j ++) {
            if (data.academico_admin[i].tiempo_uso === this.itemsRepUsos[j].tiempos) {
              this.itemsRepUsos[j].cantidadAcaAdm = data.academico_admin[i].cantidad;
              this.itemsRepUsos[j].porcentAcaAdm = numbro(this.calcularPorcentaje(data.total.academico_admin, data.academico_admin[i].cantidad)).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
              totalPorcentaje += this.calcularPorcentaje(data.total.academico_admin, data.academico_admin[i].cantidad);
              break;
            }
          }
        }

        this.totalRepUsos[1] = numbro(totalPorcentaje).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
        this.totalRepUsos[2] = data.total.academico_admin;
        totalPorcentaje = 0;

        for (let i = 0; i < data.servicio_estudiante.length; i ++) {
          for (let j = 0; j < this.itemsRepUsos.length; j ++) {
            if (data.servicio_estudiante[i].tiempo_uso === this.itemsRepUsos[j].tiempos) {
              this.itemsRepUsos[j].cantidadSerEst = data.servicio_estudiante[i].cantidad;
              this.itemsRepUsos[j].porcentServEst = numbro(this.calcularPorcentaje(data.total.servicio_estudiante, data.servicio_estudiante[i].cantidad)).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
              totalPorcentaje += this.calcularPorcentaje(data.total.servicio_estudiante, data.servicio_estudiante[i].cantidad);
              break;
            }
          }
        }

        this.totalRepUsos[3] = numbro(totalPorcentaje).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
        this.totalRepUsos[4] = data.total.servicio_estudiante;
        totalPorcentaje = 0;

        for (let i = 0; i < data.no_asignados.length; i ++) {
          for (let j = 0; j < this.itemsRepUsos.length; j ++) {
            if (data.no_asignados[i].tiempo_uso === this.itemsRepUsos[j].tiempos) {
              this.itemsRepUsos[j].cantidadSinAsig = data.no_asignados[i].cantidad;
              this.itemsRepUsos[j].porcentSinAsig = numbro(this.calcularPorcentaje(data.total.no_asignados, data.no_asignados[i].cantidad)).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
              totalPorcentaje += this.calcularPorcentaje(data.total.no_asignados, data.no_asignados[i].cantidad);
              break;
            }
          }
        }

        this.totalRepUsos[5] = numbro(totalPorcentaje).format({ output: 'percent', mantissa: 0, spaceSeparated: true });
        this.totalRepUsos[6] = data.total.no_asignados;
        totalPorcentaje = 0;
      },
      calcularPorcentaje(total, cantidad) {
        return (cantidad / total);
      },
      resetValuesTiempoUso() {
        this.itemsRepUsos = [
          { tiempos: 'Equipos con menos de 1 año', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0,  porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 1 y 2 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 3 y 4 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos entre 5 y 6 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
          { tiempos: 'Equipos con mas de 7 años', porcentAcaAdm: '0 %', cantidadAcaAdm: 0, porcentServEst: '0 %', cantidadSerEst: 0, porcentSinAsig: '0 %', cantidadSinAsig: 0 },
        ];
      },
      close() {
        this.$emit('closeModal', false);
      }
    }
  }
</script>

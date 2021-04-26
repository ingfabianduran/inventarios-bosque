<template>
  <v-dialog
    :value="dialog.isView"
    max-width="700"
    @input="close()">
      <v-card>
        <v-tabs
          v-model="tab"
          dark
          background-color="#7BC142"
          centered
          center-active
          icons-and-text>
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            v-for="(item, i) in tabs"
            :key="i">
            {{ item.titulo }}
            <v-icon>{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>
        <v-card-text>
          <Form @dataReports="updateDataReports" :isLoading="isLoading" />
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <Tabla
                :headers="headersRepMarcas"
                :items="itemsRepMarcas"
                :isRead="true" />
            </v-tab-item>
            <v-tab-item>
              <Tabla
                :headers="headersRepUsos"
                :items="itemsRepUsos"
                :isRead="true" />
            </v-tab-item>
            <v-tab-item>
              <Chart idChart="chartOne" :labels="dataChart[0].labels" :datasets="dataChart[0].datasets" />
            </v-tab-item>
            <v-tab-item>
              <Chart idChart="chartTwo" :labels="dataChart[1].labels" :datasets="dataChart[1].datasets" />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>
<script>
import Chart from '~/components/Site/Chart';
import Tabla from '~/components/Site/Table';
import Form from '~/components/Site/FormReport';

export default {
  data() {
    return {
      tab: null,
      tabs: [
        { titulo: 'Marcas de Equipo', icon: 'mdi-alphabetical-variant' },
        { titulo: 'Tiempos de Uso', icon: 'mdi-calendar-clock' },
        { titulo: 'Tipos de Equipo', icon: 'mdi-desktop-classic' },
        { titulo: 'Tipo de usuario', icon: 'mdi-card-account-details' }
      ],
      headersRepMarcas: [
        { text: 'Marca', value: 'nombre', sortable: false },
        { text: 'Area Académica y Administrativas', value: 'valuesAcaAdm', sortable: false },
        { text: 'Servicio al Estudiante', value: 'valuesServEst', sortable: false },
      ],
      headersRepUsos: [
        { text: 'Tiempo de Uso', value: 'tiempos', sortable: false },
        { text: 'Area Académica y Administrativas', value: 'porcenteAcaAdm', sortable: false },
        { text: 'Cantidad', value: 'cantidadAcaAdm', sortable: false },
        { text: 'Servicio al Estudiante', value: 'porcentajeServEst', sortable: false },
        { text: 'Cantidad', value: 'cantidadSerEst', sortable: false },
      ],
      itemsRepMarcas: [
        { nombre: 'Lenovo', valuesAcaAdm: 758, valuesServEst: 1404 },
        { nombre: 'Dell', valuesAcaAdm: 210, valuesServEst: 255 },
        { nombre: 'Hp', valuesAcaAdm: 261, valuesServEst: 176 },
        { nombre: 'Apple', valuesAcaAdm: 27, valuesServEst: 102 }
      ],
      itemsRepUsos: [
        { tiempos: 'Equipos con menos de 1 año', porcenteAcaAdm: '2,7%', cantidadAcaAdm: 36, porcentajeServEst: '9,2%', cantidadSerEst: 181 },
        { tiempos: 'Equipos entre 1 y 3 años', porcenteAcaAdm: '15,7%', cantidadAcaAdm: 207, porcentajeServEst: '13,7%', cantidadSerEst: 269 },
        { tiempos: 'Equipos entre 3 y 5 años', porcenteAcaAdm: '8,9%', cantidadAcaAdm: 117, porcentajeServEst: '50,0%', cantidadSerEst: 979 },
        { tiempos: 'Equipos entre 5 y 6 años', porcenteAcaAdm: '20,3%', cantidadAcaAdm: 268, porcentajeServEst: '4,7%', cantidadSerEst: 92 },
        { tiempos: 'Equipos entre 6 y 7 años', porcenteAcaAdm: '20,6%', cantidadAcaAdm: 271, porcentajeServEst: '10,7%', cantidadSerEst: 210 },
        { tiempos: 'Equipos con mas de 7 años', porcenteAcaAdm: '31,8%', cantidadAcaAdm: 419, porcentajeServEst: '11,5%', cantidadSerEst: 226 },
      ],
      dataChart: [
        {
          labels: ['All in One', 'Portatil', 'Desktop', 'WorkStation', 'Tablet', 'Portatil Mini', 'Tiny'],
          datasets: [
            {
              label: 'Areas Académicas y Administrativas',
              data: [947, 209, 40, 86, 29, 4, 3],
              backgroundColor: 'rgba(242, 120, 48, 0.6)'
            },
            {
              label: 'Servicio al Estudiante',
              data: [649, 872, 167, 145, 93, 11, 20],
              backgroundColor: 'rgba(123, 193, 66, 0.6)'
            },
          ],
        },
        {
          labels: ['Académico', 'Administrativo', 'Docente', 'Investigador', 'Directivo'],
          datasets: [
            {
              label: 'Cantidad de Equipos',
              data: [595, 315, 290, 104, 14],
              backgroundColor: 'rgba(242, 120, 48, 0.6)'
            }
          ]
        }
      ],
      isLoading: false
    }
  },
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  components: {
    Chart,
    Tabla,
    Form,
  },
  methods: {
    async chartTipoUsuario() {
      const { data } = await this.$axios.$post('api/reporte/tipousuario', this.form);
      this.dataChart[1].labels = data.map((item) => {
        return item.tipo;
      });
      this.dataChart[1].datasets[0].data = data.map((item) => {
        return item.cantidad;
      });
    },
    async chartTipoEquipo() {
      const { data } = await this.$axios.$post('api/reporte/tipoequipo', this.form);
      this.dataChart[0].labels = data.map((item) => {
        return item.tipo;
      });
      this.dataChart[0].datasets[0].data = data.map((item) => {
        return item.academico_administrativo;
      });
      this.dataChart[0].datasets[1].data = data.map((item) => {
        return item.servicio_estudiante;
      });
    },
    async updateDataReports(values) {
      this.form = values;

      await this.chartTipoUsuario();
      await this.chartTipoEquipo();
    },
    close() {
      this.$emit('closeModal', false);
    }
  }
}
</script>

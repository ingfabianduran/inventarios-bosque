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
            <Chart idChart="chartOne" :data="dataChart[0]" />
          </v-tab-item>
          <v-tab-item>
            <Chart idChart="chartTwo" :data="dataChart[1]" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  </v-dialog>
</template>
<script>
import Chart from '~/components/Site/Chart';
import Tabla from '~/components/Site/Table';

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
      headersRepMarcas: [
        { text: 'Marca', value: 'nombre', sortable: false },
        { text: 'Area Académica y Administrativas', value: 'values', sortable: false },
        { text: 'Servicio al Estudiante', value: 'values', sortable: false },
      ],
      headersRepUsos: [
        { text: 'Tiempo de Uso', value: 'tiempos', sortable: false },
        { text: 'Area Académica y Administrativas', value: 'porcentaje', sortable: false },
        { text: 'Cantidad', value: 'cantidad', sortable: false },
        { text: 'Servicio al Estudiante', value: 'porcentaje', sortable: false },
        { text: 'Cantidad', value: 'cantidad', sortable: false },
      ],
      itemsRepMarcas: [],
      itemsRepUsos: [],
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
    Tabla
  },
  methods: {
    close() {
      this.$emit('closeModal', false);
    }
  }
}
</script>

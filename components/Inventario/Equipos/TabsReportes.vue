<template>
  <v-dialog
    :value="dialog.isView"
    max-width="600"
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
            <Chart :data="dataChart[0]" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  </v-dialog>
</template>
<script>
import Chart from '~/components/Site/Chart';

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
              label: 'Areas Académicas y Administrativas', data: [947, 209, 40, 86, 29, 4, 3]
            },
            {
              label: 'Servicio al Estudiante', data: [649, 872, 167, 145, 93, 11, 20]
            },
          ],
        },
      ]
    }
  },
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  components: {
    Chart
  },
  methods: {
    close() {
      this.$emit('closeModal', false);
    }
  }
}
</script>

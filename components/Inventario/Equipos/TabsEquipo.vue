<template>
  <v-dialog
    :value="dialog.isView"
    max-width="600"
    @input="close()">
      <v-card>
        <v-tabs
          v-model="tab"
          dark
          background-color="#F27830"
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

          </v-tab-item>
          <v-tab-item>

          </v-tab-item>
          <v-tab-item>
            <Texto :texto="(dialog.data.caracteristica.observaciones) ? dialog.data.caracteristica.observaciones : 'No registra'" />
          </v-tab-item>
          <v-tab-item>
            <Texto :texto="(dialog.data.caracteristica.perifericos) ? dialog.data.caracteristica.perifericos : 'No registra'" />
          </v-tab-item>
          <v-tab-item>
            <Carrito url="api/inventario/sistemaoperativos/i/0" :data="dialog.data.sistema_operativos" label="Sistema Operativo" />
          </v-tab-item>
          <v-tab-item>
            <Carrito url="api/inventario/softwares/i/0" :data="dialog.data.software" label="Software" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  </v-dialog>
</template>
<script>
  import Texto from '~/components/Site/CardAreaText';
  import Carrito from '~/components/Site/CarritoSoftware';

  export default {
    data() {
      return {
        tab: null,
        tabs: [
          { titulo: 'Mantenimientos', icon: 'mdi-pipe-wrench' },
          { titulo: 'Monitores', icon: 'mdi-monitor-multiple' },
          { titulo: 'Observaciones', icon: 'mdi-eye-settings' },
          { titulo: 'Perifericos', icon: 'mdi-keyboard' },
          { titulo: 'Sistema operativo', icon: 'mdi-microsoft-windows' },
          { titulo: 'Software', icon: 'mdi-blender-software' },
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
      Texto,
      Carrito
    },
    methods: {
      close() {
        this.$emit('closeModal', false);
      }
    }
  }
</script>

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
            <Mantenimientos
              :headers="headers"
              :items="dialog.data.mantenimientos"
              :isRead="true" />
          </v-tab-item>
          <v-tab-item>
            <!--<Pantallas :id="1" />-->
          </v-tab-item>
          <v-tab-item>
            <Texto :texto="(dialog.data.caracteristica.observaciones) ? dialog.data.caracteristica.observaciones : 'No registra'" />
          </v-tab-item>
          <v-tab-item>
            <Texto :texto="(dialog.data.caracteristica.perifericos) ? dialog.data.caracteristica.perifericos : 'No registra'" />
          </v-tab-item>
          <v-tab-item>
            <!--<Sistemas :data="dialog.data.sistema_operativos" />-->
          </v-tab-item>
          <v-tab-item>
            <!--<Softwares :data="dialog.data.software" />-->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  </v-dialog>
</template>
<script>
  import Texto from '~/components/Site/CardAreaText';
  import Softwares from '~/components/Inventario/Software/CarritoSoftware';
  import Sistemas from '~/components/Inventario/Sistemas/CarritoSistemas';
  import Pantallas from '~/components/Inventario/Pantallas/CarritoPantalla';
  import Mantenimientos from '~/components/Site/Table';

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
        ],
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Fecha', value: 'created_at', sortable: false },
          { text: 'Categoria', value: 'categoria.nombre', sortable: false },
          { text: 'Especialista', value: 'user.nombre', sortable: false },
        ],
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
      Softwares,
      Sistemas,
      Pantallas,
      Mantenimientos
    },
    methods: {
      close() {
        this.$emit('closeModal', false);
      }
    },
  }
</script>

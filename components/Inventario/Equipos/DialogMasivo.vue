<template>
  <v-dialog
    :value="dialog.isView"
    max-width="600"
    @input="close()">
    <v-card>
      <v-toolbar
        color="#404827"
        class="font-weight-bold text-h4"
        dark>
        Registros Masivos
      </v-toolbar>
      <v-card-text>
        <Table class="mt-1" :headers="headers" :items="masivos" titulo="Eliminar Masivo" @itemSelect="deleteMasivo" />
        <Pagination :page="page" @getData="updateListMasivos" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  /**
    * @module components/Equipos/DialogMasivo
  */
  import Table from '~/components/Site/MiniTable';
  import Paginacion from '~/components/Site/Pagination';
  /**
   * @vue-data {Array} headers - Lista para configurar las columnas de la tabla.
   * @vue-data {Array} masivos - Lista de items de la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-prop {Object} dialog - Permite mostrar o no el v-dialog.
   * @vue-event {} close - Permite ocultar el v-dialog.
   * @vue-event {} deleteMasivo - Elimina el masivo seleccionado en la tabla.
   * @vue-event {} updateListMasivos - Actualiza la lista de masivos mediante la paginación.
  */
  export default {
    data() {
      return {
        headers: [
          { text: 'Fecha', value: 'created_at', sortable: false },
          { text: 'Equipos Registrados', value: 'equipos_count', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        masivos: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/masivos/i/10?page='
        },
      }
    },
    props: {
      dialog: {
        type: Object,
        required: true
      }
    },
    components: {
      Table,
      Paginacion
    },
    methods: {
      close() {
        this.$emit('closeMasivos', false);
      },
      async deleteMasivo(masivo) {

      },
      updateListMasivos(masivos) {

      }
    }
  }
</script>

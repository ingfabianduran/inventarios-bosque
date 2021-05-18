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
        <Loader :isShow="isLoading" color="#212121" size="70" />
        <Table class="mt-3" :headers="headers" :items="masivos" titulo="Eliminar Masivo" @itemSelect="deleteMasivo" />
        <Pagination :page="page" @getData="updateListMasivos" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  /**
    * @module components/Equipos/DialogMasivo
  */
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';
  import Table from '~/components/Site/MiniTable';
  import Paginacion from '~/components/Site/Pagination';
  /**
   * @vue-data {Array} headers - Lista para configurar las columnas de la tabla.
   * @vue-data {Array} masivos - Lista de items de la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-prop {Object} dialog - Permite mostrar o no el v-dialog.
   * @vue-event {} close - Permite ocultar el v-dialog.
   * @vue-event {Object} deleteMasivo - Elimina el masivo seleccionado en la tabla.
   * @vue-event {Object} updateListMasivos - Actualiza la lista de masivos mediante la paginación.
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
          url: 'api/inventario/masivos/i/5?page='
        },
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
      Loader,
      Table,
      Paginacion
    },
    async fetch() {
      const { data } = await this.$axios.$get('api/inventario/masivos/i/5');
      this.masivos = data.data;
      this.page.last = data.last_page;
    },
    methods: {
      close() {
        this.$emit('closeMasivos', false);
      },
      async deleteMasivo(masivo) {
        try {
          this.isLoading = true;
          const { descripcion } = await this.$axios.$delete(`api/inventario/masivos/${masivo.id}`);
          setTimeout(() => {
            this.isLoading = false;
            Alert.showToast('success', descripcion);
            this.$fetch();
          }, 1000);
        } catch (error) {
          this.isLoading = false;
        }
      },
      updateListMasivos(masivos) {
        this.masivos = masivos.data;
        this.page.current = masivos.current;
      }
    }
  }
</script>

<template>
  <v-data-table
    hide-default-footer
    dense
    :headers="headers"
    :items="items"
    :disable-pagination="isPagination">
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        icon
        @click="deleteItem(item)">
        <v-icon
          color="#F27830">
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template slot="body.append">
      <tr
        class="text-center footer-table">
        <td
          v-for="(i, index) in total"
          :key="index"
          class="footer-table-td font-weight-bold text-h4 py-2">
          {{ i }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
  /**
    * @module components/Site/MiniTable
  */
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-prop {Array} headers - Listado de columnas de la tabla.
   * @vue-prop {Array} items - Listado de items pertenecientes a la tabla.
   * @vue-prop {String} titulo - Titulo que se va a mostrar en el componente Alert.
   * @vue-prop {Boolean} [isPagination=false] - Valida si se muestra o no la paginacion.
   * @vue-prop {Array} total - Lista de los totales de la tabla.
   * @vue-event {Object} deleteItem - Selecciona el elemento y lo envia al componente padre.
  */
  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      titulo: {
        type: String,
        required: false
      },
      isPagination: {
        type: Boolean,
        default: false
      },
      total: {
        type: Array,
        required: false
      }
    },
    methods: {
      deleteItem(item) {
        Alert.showConfirm(this.titulo, 'Desea realizar la solicitud', 'question', (confirmed) => {
          if (confirmed) {
            this.$emit('itemSelect', item);
          }
        });
      }
    }
  }
</script>
<style scoped>
  .footer-table {
    background-color: #404827;
    color: #fff;
    pointer-events: none !important;
  }
</style>

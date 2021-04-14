<template>
  <v-data-table
    hide-default-footer
    dense
    :headers="headers"
    :items="items">
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
  </v-data-table>
</template>
<script>
  import Alert from '~/components/Site/SweetAlert';

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
        required: true
      },
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

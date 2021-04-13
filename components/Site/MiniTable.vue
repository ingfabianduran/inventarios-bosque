<template>
  <v-data-table
    hide-default-footer
    dense
    :loading="isLoading"
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
    data() {
      return {
        isLoading: false
      }
    },
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      titulo: {
        type: String,
        required: true
      }
    },
    methods: {
      deleteItem(item) {
        Alert.showConfirm(this.titulo, 'Desea realizar la solicitud', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const setItems = this.items.filter((data) => {
                return data.id !== item.id
              });
              const { descripcion } = await this.$axios.$put(this.url, setItems);
              setTimeout(() => {
                this.isLoading = false;
                Alert.showToast('success', descripcion);
                this.$emit('updateListItems');
              }, 1000);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      }
    }
  }
</script>

<template>
  <v-card
    outlined
    elevation="4">
    <v-card-title
      class="font-weight-bold">
      {{ title }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :loading="isLoading">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon
          @click="getModel(item.id)">
          <v-icon
            color="#7BC142">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="deleteModel(item.id)">
          <v-icon
            color="#F27830">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
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
      title: {
        type: String,
        required: true
      },
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
      }
    },
    methods: {
      async getModel(id) {
        try {
          this.isLoading = true;
          const { data } = await this.$axios.$get(`${this.url}${id}`);
          if (data !== null) {
            Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
            this.$emit('getModel', data);
          } else {
            const mensaje = this.title.toString();
            Alert.showToast('error', `${mensaje.slice(0, -1)} no encontrado`);
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        } catch (error) {
          this.isLoading = false;
        }
      },
      deleteModel(id) {
        const titulo = `Eliminar Registro`;
        Alert.showConfirm(titulo, '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = await this.$axios.$delete(`${this.url}${id}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.$emit('updateModels');
              },1000);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      }
    }
  }
</script>
<style>
  .v-progress-linear__background.primary {
    background-color: #F27830 !important;
  }
  .v-progress-linear__indeterminate.long.primary {
    background-color: #F27830 !important;
  }
  .v-progress-linear__indeterminate.short.primary {
    background-color: #F27830 !important
  }
</style>

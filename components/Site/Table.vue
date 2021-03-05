<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          icon
          :loading="isLoadingVer"
          @click="getModel(item)">
          <v-icon 
            color="#7BC142">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          :loading="isLoadingDelete"
          @click="deleteModel(item)">
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
        isLoadingVer: false,
        isLoadingDelete: false
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
          this.isLoadingVer = true;
          const { data } = await this.$axios.$get(`${this.url}${id}`);
          setTimeout(() => {
            Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
            this.isLoadingVer = false;
            this.$emit('getModel', data);
          }, 1000);
        } catch (error) {
          this.isLoadingVer = false;
        }
      },
      deleteModel(id) {
        const titulo = `Eliminar ${this.title.substring(0, cadena.length - 1)}`;
        Alert.showConfirm(titulo, '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoadingDelete = true;
              const { descripcion } = await this.$axios.$delete(`${this.url}${id}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoadingDelete = false;
              },1000);
            } catch (error) {
              this.isLoadingDelete = false;
            }
          }
        });
      }
    }
  }
</script>
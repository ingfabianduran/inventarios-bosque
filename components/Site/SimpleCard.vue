<template>
  <v-card
    outlined>
    <v-toolbar
      color="#404827"
      dark
      short>
      <v-toolbar-title
        class="font-weight-bold text-h5">
        {{ model.nombre }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        :loading="isLoadingVer"
        @click="getModelo(model.id)">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Ver y/o Actualizar
      </v-btn>
      <v-btn
        color="#F27830"
        dark
        :loading="isLoadingDelete"
        @click="deleteModel(model.id)">
        <v-icon left>
          mdi-delete
        </v-icon>
        Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        isLoadingVer: false,
        isLoadingDelete: false,
      }
    },
    props: {
      model: {
        type: Object,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    },
    methods: {
      async getModelo(id) {
        try {
          this.isLoadingVer = true;
          const { data } = await this.$axios.$get(`${this.url}${id}`);
          if (data !== null) {
            Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
            this.$emit('getModel', data);
          } else {
            Alert.showToast('error', 'Elemento no encontrado');
          }
          setTimeout(() => {
            this.isLoadingVer = false;
          }, 1000);
        } catch (error) {
          this.isLoadingVer = false;
        }
      },
      deleteModel(id) {
        Alert.showConfirm('Eliminar Registro', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoadingDelete = true;
              const { descripcion } = await this.$axios.$delete(`${this.url}${id}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoadingDelete = false;
                this.$emit('getModels');
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

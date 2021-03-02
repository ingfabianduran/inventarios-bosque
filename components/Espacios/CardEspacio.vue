<template>
  <v-card
    elevation="3"
    outlined>
    <v-card-title
      class="font-weight-bold">
      {{ `Espacio ${espacio.nombre}` }}
      <v-spacer></v-spacer>
      <v-chip
        color="#3C4024"
        dark
        label>
        <v-icon left>
          mdi-home-modern
        </v-icon>
        {{ (espacio.edificio) ? espacio.edificio.nombre : 'No Registra' }}
      </v-chip>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        elevation="3"
        :loading="isLoadingVer"
        @click="getEspacio(espacio.id)">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Ver y/o Actualizar
      </v-btn>
      <v-btn
        color="#F27830"
        dark
        elevation="3"
        :loading="isLoadingDelete"
        @click="deleteEspacio(espacio.id)">
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
        isLoadingDelete: false
      }
    },
    props: {
      espacio: {
        type: Object,
        required: true
      } 
    },
    methods: {
      async getEspacio(id) {
        this.isLoadingVer = true;
        const espacio = await this.$axios.$get(`api/asignacion/espacios/${id}`);
        setTimeout(() => {
          Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
          this.isLoadingVer = false;
          this.$emit('getEspacio', espacio);
        }, 1000);
      },
      deleteEspacio(id) {
        Alert.showConfirm('Eliminar Espacio', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            this.isLoadingDelete = true;
            const espacio = await this.$axios.$delete(`api/asignacion/espacios/${id}`);
            if (espacio) {
              setTimeout(() => {
                Alert.showToast('success', 'Registro eliminado correctamente');
                this.isLoadingDelete = false;
                this.$emit('getEspacios');
              },1000);
            }
          }
        });
      }
    }
  }
</script>
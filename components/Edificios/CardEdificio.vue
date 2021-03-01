<template>
  <v-card
    elevation="3"
    outlined>
    <v-card-title
      class="font-weight-bold">
      {{ edificio.nombre }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        elevation="3"
        :loading="isLoading"
        @click="getEdificio(edificio.id)">
        <v-icon left>
          mdi-pencil
        </v-icon>
        Ver y/o Actualizar
      </v-btn>
      <v-btn
        color="#F27830"
        dark
        elevation="3"
        @click="deleteEdificio(edificio.id)">
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
        isLoading: false
      }
    },
    props: {
      edificio: {
        type: Object,
        required: true
      }
    }, 
    methods: {
      async getEdificio(id) {
        this.isLoading = true;
        const edificio = await this.$axios.$get(`api/asignacion/edificios/${id}`);
        setTimeout(() => {
          Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
          this.isLoading = false;
          this.$emit('getEdificio', edificio);
        }, 1000);
      },
      deleteEdificio(id) {
        
      }
    }
  }
</script>
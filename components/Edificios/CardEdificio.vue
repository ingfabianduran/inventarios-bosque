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
        :loading="isLoadingVer"
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
        :loading="isLoadingDelete"
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
        isLoadingVer: false,
        isLoadingDelete: false,
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
        try {
          this.isLoadingVer = true;
          const { data } = await this.$axios.$get(`api/asignacion/edificios/${id}`);
          if (data !== null) {
            Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
            this.$emit('getEdificio', data);
          } else {
            Alert.showToast('error', 'Edificio no encontrado');
          }
          setTimeout(() => {
            this.isLoadingVer = false;
          }, 1000);
        } catch (error) {
          this.isLoadingVer = false;
        }
      },
      deleteEdificio(id) {
        Alert.showConfirm('Eliminar Edificio', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoadingDelete = true;
              const { descripcion } = await this.$axios.$delete(`api/asignacion/edificios/${id}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoadingDelete = false;
                this.$emit('getEdificios');
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

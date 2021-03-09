<template>
  <v-card
    elevation="3"
    outlined>
    <v-card-title
      class="font-weight-bold">
      {{ dependencia.nombre }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="#7BC142"
        dark
        elevation="3"
        :loading="isLoadingVer"
        @click="getDependencia(dependencia.id)">
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
        @click="deleteDependencia(dependencia.id)">
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
      dependencia: {
        type: Object,
        required: true
      }
    },
    methods: {
      async getDependencia(id) {
        try {
          this.isLoadingVer = true;
          const { data } = await this.$axios.$get(`api/asignacion/dependencias/${id}`);
          if (data !== null) {
            Alert.showToast('success', 'Por favor vizualice y/o actualicé la información');
            this.$emit('getDependencia', data);
          } else {
            Alert.showToast('error', 'Dependencia no encontrada');
          }
          setTimeout(() => {
            this.isLoadingVer = false;
          }, 1000);
        } catch (error) {
          this.isLoadingVer = false;
        }
      },
      deleteDependencia(id) {
        Alert.showConfirm('Eliminar Dependencia', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoadingDelete = true;
              const { descripcion } = await this.$axios.$delete(`api/asignacion/dependencias/${id}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoadingDelete = false;
                this.$emit('getDependencias');
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

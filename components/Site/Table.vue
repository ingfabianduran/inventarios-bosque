<template>
  <v-card
    outlined>
    <v-card-title
      class="font-weight-bold text-h4"
      v-if="!isRead">
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="busqueda"
        :label="search.label"
        filled
        rounded
        append-icon="mdi-eye-settings"
        color="#7BC142"
        @click:append="resetSearch">
      </v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :loading="isLoading">
      <template v-slot:[`item.actions`]="{ item }" v-if="!isRead">
        <v-btn
          dark
          small
          color="#7BC142"
          @click="getModel(item.id)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          dark
          small
          color="#F27830"
          @click="deleteModel(item.id)"
          v-if="user.rol === 'COORDINADOR'">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  /**
    * @module components/Site/Table
  */
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-data {Boolean} isLoading - Valida si la tabla esta cargando o no.
   * @vue-data {String} busqueda - Captura el texto de la busqueda.
   * @vue-prop {String} title - Titulo ubicado en el v-card-title.
   * @vue-prop {Array} headers - Configuracion de las columnas de la tabla.
   * @vue-prop {Array} items - Items mostrados en la tabla.
   * @vue-prop {String} url - Url que apunta a una api.
   * @vue-prop {Obejct} search - Almacena las configuraciones para realizar la busqueda sobre una url.
   * @vue-prop {Boolean} [isRead=false] - Muestra o no el componente v-card-title.
   * @vue-prop {Boolean} [isPagination=true] - Habilita o deshabilita la paginacion sobre la tabla.
   * @vue-event {Number} getModel - Realiza la petición get a la url y envia la información al componente padre.
   * @vue-event {Number} deleteModel - Realiza la peticion delete a traves de la url y emite un evento al componente padre.
   * @vue-event {} resetSearch - Setea el valor de la variable busqueda y emite un evento al componente padre.
   * @vue-computed {} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        isLoading: false,
        busqueda: ''
      }
    },
    props: {
      title: {
        type: String,
        required: false
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
        required: false
      },
      search: {
        type: Object,
        required: false
      },
      isRead: {
        type: Boolean,
        default: false
      },
      isPagination: {
        type: Boolean,
        default: true
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
      },
      resetSearch() {
        this.busqueda = '';
        this.$emit('resetBusqueda');
      }
    },
    /**
      * Watch Events:
      * @property {Function} busqueda - Realiza una peticion get y envia la información al componente padre.
    */
    watch: {
      async busqueda(value) {
        if (value !== null && value.length > 0) {
          const { data } = await this.$axios.$get(`${this.search.url}${value}`);
          const pagination = {
            data: data,
            url: `${this.url}${value}?page=`
          };
          this.$emit('searchModel', pagination);
        }
      }
    },
    computed: {
      user() {
        return this.$auth.user;
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

<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="70" />
    <ValidationObserver
      ref="formEdificio">
      <v-form
        autocomplete="off"
        @submit.prevent="storeEdificio">
        <v-card-title
          class="font-weight-bold text-h4">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:45">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del Bloque"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions
          class="justify-end">
          <v-btn
            type="submit"
            dark
            color="#F27830">
            {{ this.textBtn }}
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="clearForm()">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  /**
    * @module components/Asignacion/Edificios/FormEdificio
  */
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} [edificio={}] - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-event {} storeEdificio - Registra o actualiza un edificio.
   * @vue-event {} clearForm - Limpia los datos del formulario.
  */
  export default {
    data() {
      return {
        form: {
          nombre: ''
        },
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      edificio: {
        type: Object,
        required: false
      },
      url: {
        type: String,
        required: true
      },
      textBtn: {
        type: String,
        required: true
      },
    },
    components: {
      Loader
    },
    methods: {
      async storeEdificio() {
        const validate = await this.$refs.formEdificio.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nuevo Edificio') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
                setTimeout(() => {
                  Alert.showToast('success', descripcion);
                  this.isLoading = false;
                  this.clearForm();
                }, 500);
              } catch (error) {
                this.isLoading = false;
              }
            }
          });
        }
      },
      clearForm() {
        this.$refs.formEdificio.reset();
        this.form.nombre = '';
        this.$emit('clearForm');
      }
    },
    /**
     * Watch Events:
     * @property {Function} edificio - Setea los valores del formulario.
    */
    watch: {
      edificio() {
        this.form.nombre = this.edificio.nombre;
      }
    }
  }
</script>

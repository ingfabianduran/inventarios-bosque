<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="70" />
    <ValidationObserver
      ref="formSoftware">
      <v-form
        @submit.prevent="storeSoftware">
        <v-card-title
          class="font-weight-bold text-h4">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:45">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del software"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Free,Licenciado">
                <v-select
                  v-model="form.tipo"
                  :items="tipos"
                  label="Tipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-select>
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
    * @module components/Inventario/Software/FormSoftware
  */
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';
  /**
   * @vue-data {Array} tipos - Tipos que pueda tener un software.
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} [software={}] - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-event {} storeSoftware - Registra o actualiza un software.
   * @vue-event {} clearForm - Limpia los datos del formulario.
  */
  export default {
    data() {
      return {
        tipos: ['Free', 'Licenciado'],
        form: {
          nombre: '',
          tipo: ''
        },
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      software: {
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
      async storeSoftware() {
        const validate = await this.$refs.formSoftware.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nuevo Software') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
        this.$refs.formSoftware.reset();
        this.form.nombre = '';
        this.form.tipo = '';
        this.$emit('clearForm');
      }
    },
    /**
      * Watch Events:
      * @property {Function} software - Setea los valores del formulario.
    */
    watch: {
      software() {
        this.form.nombre = this.software.nombre;
        this.form.tipo = this.software.tipo;
      }
    }
  }
</script>

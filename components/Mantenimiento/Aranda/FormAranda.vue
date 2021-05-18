<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="60" />
    <ValidationObserver
      ref="formAranda">
      <v-form
        autocomplete="off"
        @submit.prevent="storeAranda">
        <v-card-title
          class="font-weight-bold text-h5">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Incidente,Requerimiento">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="caso"
                rules="required|min:3|max:50">
                <v-text-field
                  v-model="form.caso"
                  label="Caso"
                  placeholder="Numero del caso"
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
            color="#F27830"
            :disabled="stateBtn">
            {{ this.textBtn }}
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="clearForm()">
            Cancelar
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142"
            @click="deleteCasoAranda()"
            v-if="aranda.hasOwnProperty('id') && this.$auth.user.rol === 'COORDINADOR'">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>
<script>
  /**
    * @module components/Mantenimiento/Aranda/FormAranda
  */
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';
  import { mapGetters } from 'vuex';
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Tipo que puede tener un caso Aranda.
   * @vue-data {Boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} [aranda={}] - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-prop {Boolean} [stateBtn=false] - Habilita o deshabilita el submit, dependiendo la peticion a realizar.
   * @vue-prop {Number} mantenimiento - Almacena el id del mantenimiento asociado al caso Aranda a registrar.
   * @vue-event {} storeAranda - Registra o actualiza un caso Aranda.
   * @vue-event {} deleteCasoAranda - Elimina un caso Aranda.
   * @vue-event {} clearForm - Limpia los datos del formulario.
   * @vue-computed {Object} getValues - Obtiene los config para los formularios.
   * @vue-computed {Array} tipos - Obtiene los tipos de caso para Aranda.
  */
  export default {
    data() {
      return {
        form: {
          tipo: '',
          caso: '',
          mantenimiento_id: ''
        },
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      aranda: {
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
      stateBtn: {
        type: Boolean,
        default: false
      },
      mantenimiento: {
        type: Number,
        required: true
      }
    },
    components: {
      Loader
    },
    methods: {
      async storeAranda() {
        const validate = await this.$refs.formAranda.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Registrar Caso Aranda') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
      deleteCasoAranda() {
        Alert.showConfirm('Eliminar Registro', '¿Esta seguro de eliminar el registro?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = await this.$axios.$delete(`${this.url}`);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.clearForm();
              },1000);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      clearForm() {
        this.$refs.formAranda.reset();
        this.form.tipo = '';
        this.form.caso = '';
        this.form.mantenimiento_id = 0;
        this.$emit('clearForm');
      }
    },
    /**
      * Watch Events:
      * @property {Function} aranda - Setea los valores del formulario.
    */
    watch: {
      aranda() {
        if (this.aranda !== null) {
          this.form.tipo = this.aranda.tipo;
          this.form.caso =  this.aranda.caso;
          this.form.mantenimiento_id = this.mantenimiento;
        } else {
          this.form.tipo = '';
          this.form.caso = '';
          this.form.mantenimiento_id = this.mantenimiento;
        }
      }
    },
    computed: {
      ...mapGetters([
        'getValues'
      ]),
      tipos() {
        return this.getValues('aranda');
      }
    }
  }
</script>

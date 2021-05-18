<template>
  <v-card>
    <ValidationObserver
      ref="formPantalla">
      <v-form
        autocomplete="off"
        @submit.prevent="storePantalla">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              :md="(!marca) ? 6 : 4">
              <ValidationProvider
                v-slot="{ errors }"
                name="pulgadas"
                rules="required">
                <v-text-field
                  v-model="form.pulgadas"
                  label="Pulgadas"
                  placeholder="Pulgadas de la pantalla"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              :md="(!marca) ? 6 : 4">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Externa,Integrada">
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
            <v-col
              cols="12"
              md="4"
              v-if="marca">
              <ValidationProvider
                v-slot="{ errors }"
                name="marca"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.marca_id"
                  label="Marca"
                  item-text="nombre"
                  item-value="id"
                  :items="marcas"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
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
            Finalizar
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
    * @module components/Inventario/Pantallas/FormPantalla
  */
  import { mapGetters } from 'vuex';
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Tipos que puede tener una pantalla.
   * @vue-data {Array} marcas - Muestra las marcas registradas en el sistema.
   * @vue-prop {Boolean} [marca=true] - Valida si se muestran o no las marcas registradas.
   * @vue-prop {Object} [pantalla={}] - Captura los datos y los ingresa en el formulario.
   * @vue-event {} getMarcas - Trae todas las marcas registradas en el sistema.
   * @vue-event {} storePantalla - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {Object} getValues - Obtiene los config para los formularios.
   * @vue-computed {Array} tipos - Obtiene los tipos de pantalla.
  */
  export default {
    data() {
      return {
        form: {
          pulgadas: '',
          tipo: '',
          marca_id: ''
        },
        marcas: []
      }
    },
    props: {
      marca: {
        type: Boolean,
        default: true,
      },
      pantalla: {
        type: Object,
        required: false
      }
    },
    async fetch() {
      await this.getMarcas();
    },
    methods: {
      async getMarcas() {
        const { data } = await this.$axios.$get('api/inventario/marcas/i/0');
        this.marcas = data;
      },
      async storePantalla() {
        const validate = await this.$refs.formPantalla.validate();
        if (validate) {
          this.$emit('getPantalla', this.form);
        }
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formPantalla.reset();
        this.form.pulgadas = '';
        this.form.tipo = '';
        this.form.marca_id = '';
      }
    },
    /**
      * Watch Events:
      * @property {Function} pantalla - Setea los valores del formulario.
    */
    watch: {
      pantalla() {
        this.form.pulgadas = this.pantalla.pulgadas;
        this.form.tipo = this.pantalla.tipo;

        if (this.pantalla.marca !== null) {
          this.form.marca_id = this.pantalla.marca.id;
        }
      }
    },
    computed: {
      ...mapGetters([
        'getValues'
      ]),
      tipos() {
        return this.getValues('pantalla');
      }
    }
  }
</script>

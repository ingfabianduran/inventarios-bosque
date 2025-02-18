<template>
  <v-card>
    <ValidationObserver
      ref="formInventario">
      <v-form
        autocomplete="off"
        @submit.prevent="storeInventario">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="inventario"
                rules="min:3|max:50">
                <v-text-field
                  v-model="form.inventario"
                  label="Inventario"
                  placeholder="Numero de inventario del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="interno"
                rules="min:3|max:50">
                <v-text-field
                  v-model="form.n_interno"
                  label="Numero Interno"
                  placeholder="Numero interno del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
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
            Siguiente
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#3C4024"
            @click="omitir()">
            Omitir
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
    * @module components/Inventario/Inventarios/FormInventario
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-prop {Object} [inventario={}] - Captura los datos y los ingresa en el formulario.
   * @vue-event {} storeInventario - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        form: {
          inventario: '',
          n_interno: ''
        }
      }
    },
    props: {
      inventario: {
        type: Object,
        required: false
      }
    },
    methods: {
      async storeInventario() {
        const validate = await this.$refs.formInventario.validate();
        if (validate) {
          this.$emit('getInventario', this.form);
        }
      },
      omitir() {
        this.$emit('omitir');
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formInventario.reset();
        this.form.inventario = '';
        this.form.n_interno = '';
      }
    },
    /**
      * Watch Events:
      * @property {Function} inventario - Setea los valores del formulario.
    */
    watch: {
      inventario() {
        if (this.inventario !== null) {
          this.form.inventario = this.inventario.inventario;
          this.form.n_interno = this.inventario.n_interno;
        }
      }
    },
    computed: {
      rol() {
        return this.$auth.user.rol;
      }
    }
  }
</script>

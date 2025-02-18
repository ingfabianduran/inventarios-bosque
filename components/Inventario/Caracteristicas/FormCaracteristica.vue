<template>
  <v-card>
    <ValidationObserver
      ref="formCaracteristica">
      <v-form
        autocomplete="off"
        @submit.prevent="storeCaracteristica">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="usuario_dominio"
                rules="min:3|max:60">
                <v-text-field
                  v-model="form.usuario_dominio"
                  label="Usuario de dominio"
                  placeholder="Usuario de dominio del equipo"
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
                name="nombre_red"
                rules="min:3|max:60">
                <v-text-field
                  v-model="form.nombre_red"
                  label="Nombre de red"
                  placeholder="Nombre de red del equipo"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="perifericos"
                rules="min:3|max:1000">
                <v-textarea
                  v-model="form.perifericos"
                  outlined
                  label="Perifericos"
                  auto-grow
                  color="#7BC142"
                  :error-messages="errors">
                </v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="observaciones"
                rules="max:1000">
                <v-textarea
                  v-model="form.observaciones"
                  outlined
                  label="Observaciones"
                  auto-grow
                  color="#7BC142"
                  :error-messages="errors">
                </v-textarea>
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
    * @module components/Inventario/Caracteristicas/FormCaracteristica
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-prop {Object} [caracteristica={}] - Captura los datos y los ingresa en el formulario.
   * @vue-event {} storeCaracteristica - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
  */
  export default {
    data() {
      return {
        form: {
          usuario_dominio: '',
          nombre_red: '',
          perifericos: '',
          observaciones: null
        }
      }
    },
    props: {
      caracteristica: {
        type: Object,
        required: false
      }
    },
    methods: {
      async storeCaracteristica() {
        const validate = await this.$refs.formCaracteristica.validate();
        if (validate) {
          this.$emit('getCaracteristica', this.form);
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
        this.$refs.formCaracteristica.reset();
        this.form.usuario_dominio = '';
        this.form.nombre_red = '';
        this.form.perifericos = '';
        this.form.observaciones = '';
      }
    },
    /**
      * Watch Events:
      * @property {Function} caracteristica - Setea los valores del formulario.
    */
    watch: {
      caracteristica() {
        if (this.caracteristica !== null) {
          this.form.usuario_dominio = this.caracteristica.usuario_dominio;
          this.form.nombre_red = this.caracteristica.nombre_red;
          this.form.perifericos = this.caracteristica.perifericos;
          this.form.observaciones = this.caracteristica.observaciones;
        }
      }
    },
  }
</script>

<template>
  <v-card>
    <ValidationObserver
      ref="formProcesador">
      <v-form
        autocomplete="off"
        @submit.prevent="storeProcesador">
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
                  placeholder="Nombre del procesador"
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
                name="frecuencia"
                rules="required">
                <v-text-field
                  v-model="form.frecuencia"
                  label="Frecuencia"
                  placeholder="Frecuencia del procesador"
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
    * @module components/Inventario/Procesadores/FormProcesadores
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-event {} storeProcesador - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
  */
  export default {
    data() {
      return {
        form: {
          nombre: '',
          frecuencia: ''
        }
      }
    },
    methods: {
      async storeProcesador() {
        const validate = await this.$refs.formProcesador.validate();
        if (validate) {
          this.$emit('getProcesador', this.form);
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
        this.$refs.formProcesador.reset();
        this.form.nombre = '';
        this.form.frecuencia = '';
      }
    }
  }
</script>

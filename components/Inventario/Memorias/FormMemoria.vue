<template>
  <v-card>
    <ValidationObserver
      ref="formMemoria">
      <v-form
        autocomplete="off"
        @submit.prevent="storeMemoria">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|min:3|max:20">
                <v-text-field
                  v-model="form.tipo"
                  label="Tipo"
                  placeholder="Tipo de memoria"
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
                name="capacidad"
                rules="required|min:3|max:20">
                <v-text-field
                  v-model="form.capacidad"
                  label="Capacidad"
                  placeholder="Capacidad de la memoria"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="descripcion"
                rules="min:3|max:200">
                <v-textarea
                  v-model="form.descripcion"
                  outlined
                  label="Descripción de la memoria"
                  auto-grow
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
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
    * @module components/Inventario/Memorias/FormMemoria
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-event {} storeMemoria - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        form: {
          tipo: '',
          capacidad: '',
          descripcion: ''
        }
      }
    },
    methods: {
      async storeMemoria() {
        const validate = await this.$refs.formMemoria.validate();
        if (validate) {
          this.$emit('getMemoria', this.form);
        }
      },
      omitir() {
        this.$emit('omitirMemoria');
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formMemoria.reset();
        this.form.tipo = '';
        this.form.capacidad = '';
        this.form.descripcion = '';
      }
    },
    computed: {
      rol() {
        return this.$auth.user.rol;
      }
    }
  }
</script>

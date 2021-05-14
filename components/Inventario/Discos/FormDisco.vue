<template>
  <v-card>
    <ValidationObserver
      ref="formDisco">
      <v-form
        autocomplete="off"
        @submit.prevent="storeDisco">
        <v-card-text>
          <v-row>
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
                  placeholder="Capacidad del disco"
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
                name="tipo"
                rules="required|oneOf:HDD,SSD">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
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
                name="descripcion"
                rules="min:3|max:50">
                <v-textarea
                  v-model="form.descripcion"
                  outlined
                  label="Descripción del disco"
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
    * @module components/Inventario/Discos/FormDisco
  */
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Tipos que puede tener un disco duro.
   * @vue-event {} storeDisco - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        form: {
          capacidad: '',
          tipo: '',
          descripcion: ''
        },
        tipos: ['HDD', 'SSD']
      }
    },
    methods: {
      async storeDisco() {
        const validate = await this.$refs.formDisco.validate();
        if (validate) {
          this.$emit('getDisco', this.form);
        }
      },
      omitir() {
        this.$emit('omitirDisco');
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formDisco.reset();
        this.form.capacidad = '';
        this.form.tipo = '';
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

<template>
  <v-card>
    <ValidationObserver
      ref="formMarca">
      <v-form
        autocomplete="off"
        @submit.prevent="storeMarca">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:60">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre de la marca"
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
  export default {
    data() {
      return {
        form: {
          nombre: ''
        },
      }
    },
    methods: {
      async storeMarca() {
        const validate = await this.$refs.formMarca.validate();
        if (validate) {
          this.$emit('getMarca', this.form);
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
        this.$refs.formMarca.reset();
        this.form.nombre = '';
      }
    },
  }
</script>

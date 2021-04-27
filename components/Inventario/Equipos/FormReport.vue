<template>
  <v-card
    outlined>
    <ValidationObserver
      ref="formReporte">
      <v-form
        autocomplete="off"
        @submit.prevent="setReporte"
        class="mt-4">
        <v-card-title
          class="font-weight-bold text-h4">
          Generar Reporte
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
            cols="12"
            md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="fecha inicial"
                rules="required">
                <v-text-field
                  v-model="form.fecha_inicio"
                  label="Fecha Inicial"
                  placeholder="Fecha inicial"
                  v-mask="'##-##-####'"
                  prepend-inner-icon="mdi-calendar-month"
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
                name="fecha final"
                rules="required">
                <v-text-field
                  v-model="form.fecha_fin"
                  label="Fecha Final"
                  placeholder="Fecha final"
                  v-mask="'##-##-####'"
                  prepend-inner-icon="mdi-calendar-month"
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
            Generar
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
          fecha_inicio: '',
          fecha_fin: ''
        }
      }
    },
    methods: {
      async setReporte() {
        const validate = await this.$refs.formReporte.validate();
        if (validate) {
          this.$emit('dataReports', this.form);
        }
      },
      clearForm() {
        this.$refs.formReporte.reset();
        this.form.fecha_inicio = '';
        this.form.fecha_fin = '';
      }
    }
  }
</script>

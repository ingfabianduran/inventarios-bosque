<template>
  <ValidationObserver
    ref="formReporte">
    <v-form
      autocomplete="off"
      @submit.prevent="setReporte"
      class="mt-4">
      <v-row>
        <v-col
        cols="12"
        md="4">
          <ValidationProvider
            v-slot="{ errors }"
            name="fecha inicial"
            rules="required">
            <v-text-field
              v-model="form.fecha_inicio"
              label="Fecha Inicial"
              placeholder="Fecha inicial"
              v-mask="'##-##-####'"
              outlined
              color="#7BC142"
              dense
              :error-messages="errors">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col
          cols="12"
          md="4">
          <ValidationProvider
            v-slot="{ errors }"
            name="fecha final"
            rules="required">
            <v-text-field
              v-model="form.fecha_fin"
              label="Fecha Final"
              placeholder="Fecha final"
              v-mask="'##-##-####'"
              outlined
              color="#7BC142"
              dense
              :error-messages="errors">
            </v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="text-center">
          <v-btn
            type="submit"
            dark
            color="#F27830"
            :loading="isLoading">
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          fecha_inicio: '01-10-2010',
          fecha_fin: '01-01-2022'
        }
      }
    },
    props: {
      isLoading: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      async setReporte() {
        const validate = await this.$refs.formReporte.validate();
        if (validate) {
          this.$emit('dataReports', this.form);
        }
      }
    }
  }
</script>

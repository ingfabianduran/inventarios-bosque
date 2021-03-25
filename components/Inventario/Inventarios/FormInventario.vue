<template>
  <v-card>
    <ValidationObserver
      ref="formInventario">
      <v-form>
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
                  :error-messages="errors">
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
            color="#3C4024">
            Omitir
          </v-btn>
          <v-btn
            type="button"
            dark
            color="#7BC142">
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
          inventario: '',
          n_interno: ''
        }
      }
    }
  }
</script>

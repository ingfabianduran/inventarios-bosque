<template>
  <v-card>
    <ValidationObserver>
      <v-form>
        <v-card-title>Nuevo Espacio</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del Espacio"
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
                name="edificio"
                rules="required">
                <v-select
                  v-model="form.edificio"
                  label="Edificio"
                  outlined
                  :error-messages="errors">
                </v-select>
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
            Registrar
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
          nombre: '',
          edificio: ''
        }
      }
    }
  }
</script>
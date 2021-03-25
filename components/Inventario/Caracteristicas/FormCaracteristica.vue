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
                rules="min:3|max:1000">
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
          usuario_dominio: '',
          nombre_red: '',
          perifericos: '',
          observaciones: ''
        }
      }
    }
  }
</script>

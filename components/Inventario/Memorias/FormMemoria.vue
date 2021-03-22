<template>
  <v-card>
    <ValidationObserver
      ref="formMemoria">
      <v-form>
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
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="capacidad"
                rules="required">
                <v-text-field
                  v-model="form.capacidad"
                  label="Capacidad"
                  placeholder="Capacidad de la memoria"
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
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="descripcion"
                rules="required|max:45">
                <v-textarea
                  v-model="form.descripcion"
                  outlined
                  label="Descripción de la memoria"
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
            Registrar
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
          tipo: '',
          capacidad: '',
          descripcion: ''
        }
      }
    }
  }
</script>

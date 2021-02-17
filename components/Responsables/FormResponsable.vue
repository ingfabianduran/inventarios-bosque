<template>
  <v-card>
    <ValidationObserver>
      <v-form>
        <v-card-title>Nuevo Responsable</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:10|max:120">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del responsable"
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
                name="cargo"
                rules="required|min:10|max:60">
                <v-text-field
                  v-model="form.cargo"
                  label="cargo"
                  placeholder="Cargo del responsable"
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
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Académico,Administrativo,Docente,Directivo,Investigador">
                <v-select
                  v-model="form.tipo"
                  :items="roles"
                  label="Rol"
                  outlined
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col 
              cols="12"
              md="2">
              <ValidationProvider
                v-slot="{ errors }"
                name="extension"
                rules="integer|min:4|max:5">
                <v-text-field
                  v-model="form.extension"
                  label="Extensión"
                  placeholder="Extensión del responsable"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col 
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="area"
                rules="required|integer">
                <v-select
                  v-model="form.area"
                  :items="areas"
                  label="Area"
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
        roles: ['Académico', 'Administrativo', 'Docente', 'Directivo', 'Investigador'],
        areas: [],
        form: {
          nombre: '',
          cargo: '',
          tipo: '',
          extension: '',
          area: ''
        }
      }
    }
  }
</script>
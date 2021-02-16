<template>
  <v-card>
    <ValidationObserver>
      <v-form>
        <v-card-title>Nuevo Especialista</v-card-title>
        <v-card-text>
          <v-row>
            <v-col 
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="documento"
                rules="required">
                <v-text-field
                  v-model="form.documento"
                  label="Documento"
                  placeholder="Documento del Especialista"
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
                name="correo"
                rules="required">
                <v-text-field
                  v-model="form.correo"
                  label="Correo"
                  placeholder="Correo del Especialista"
                  suffix="@unbosque.edu.co"
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
                name="nombres"
                rules="required">
                <v-text-field
                  v-model="form.nombres"
                  label="Nombres"
                  placeholder="Nombres del Especialista"
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
                name="apellidos"
                rules="required">
                <v-text-field
                  v-model="form.apellidos"
                  label="Apellidos"
                  placeholder="Apellidos del Especialista"
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
                name="password"
                rules="required">
                <v-text-field
                  v-model="form.password"
                  :append-icon=" showPassword ? 'mdi-eye' : 'mdi-eye-off' "
                  :type=" showPassword ? 'text' : 'password' "
                  @click:append=" showPassword = !showPassword "
                  label="Password"
                  placeholder="Password del Especialista"
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
                name="rol"
                rules="required">
                <v-select
                  v-model="form.rol"
                  label="Rol"
                  outlined
                  :items="roles"
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
        showPassword: false,
        roles: ['Coordinador', 'Soporte', 'Mesa'],
        form: {
          documento: '',
          correo: '',
          nombres: '',
          apellidos: '',
          password: '',
          rol: ''
        }
      }
    }
  }
</script>
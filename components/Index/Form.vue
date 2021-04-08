<template>
  <ValidationObserver
    ref="formLogin">
    <v-form
      @submit.prevent="logIn"
      class="text-center">
      <p class="text-h2 mb-10">Login</p>
      <ValidationProvider
        v-slot="{ errors }"
        name="usuario"
        rules="required|email">
        <v-text-field
          v-model="form.email"
          label="Usuario"
          placeholder="Nombre de Usuario"
          prepend-inner-icon="mdi-account"
          outlined
          color="#7BC142"
          :error-messages="errors">
        </v-text-field>
      </ValidationProvider>
      <ValidationProvider
        v-slot="{ errors }"
        name="password"
        rules="required">
        <v-text-field
          v-model="form.password"
          label="Contraseña"
          placeholder="Contraseña del Usuario"
          prepend-inner-icon="mdi-lock"
          outlined
          color="#7BC142"
          :error-messages="errors">
        </v-text-field>
      </ValidationProvider>
      <v-btn
        type="submit"
        dark
        color="#F27830"
        x-large
        rounded>
        Ingresar
      </v-btn>
      <v-btn
        type="button"
        dark
        color="#7BC142"
        x-large
        rounded>
        Cancelar
      </v-btn>
    </v-form>
  </ValidationObserver>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async logIn() {
        await this.$auth.loginWith('laravelSanctum', { data: this.form });
      }
    }
  }
</script>

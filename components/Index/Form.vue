<template>
  <ValidationObserver
    ref="formLogin">
    <v-form
      @submit.prevent="logIn"
      class="text-center">
      <Loader :isShow="isLoading" color="#212121" size="90" />
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
          type="password"
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
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        form: {
          email: 'ruben23@live.com',
          password: 'password'
        },
        isLoading: false
      }
    },
    components: {
      Loader
    },
    methods: {
      async logIn() {
        try {
          const validate = await this.$refs.formLogin.validate();
          if (validate) {
            this.isLoading = true;
            const { data } = await this.$auth.loginWith('laravelJWT', { data: this.form });
            Alert.showToast('success', data.descripcion);
            setTimeout(() => {
              this.isLoading = false;
              this.$router.push('/inventarios/modelos');
            }, 3000);
          }
        } catch (error) {
          this.isLoading = false;
        }
      }
    }
  }
</script>

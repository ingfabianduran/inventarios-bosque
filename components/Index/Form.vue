<template>
  <ValidationObserver
    ref="formLogin">
    <v-form
      @submit.prevent="logIn"
      autocomplete="off"
      class="text-center">
      <p class="text-h3 font-weight-bold mb-10">Inventario Tecnología</p>
      <ValidationProvider
        v-slot="{ errors }"
        name="usuario"
        rules="required">
        <v-text-field
          v-model="form.email"
          label="Nombre de usuario"
          prepend-inner-icon="mdi-account"
          outlined
          rounded
          suffix="@unbosque.edu.co"
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
          label="Contraseña del usuario"
          prepend-inner-icon="mdi-lock"
          outlined
          rounded
          color="#7BC142"
          :error-messages="errors">
        </v-text-field>
      </ValidationProvider>
      <v-btn
        type="submit"
        dark
        color="#F27830"
        x-large
        class="mr-2"
        :loading="isLoading">
        Ingresar
      </v-btn>
      <v-btn
        type="button"
        dark
        color="#7BC142"
        x-large>
        Cancelar
      </v-btn>
    </v-form>
    <v-alert
      type="error"
      class="mt-2"
      v-if="message !== ''">
      {{ message }}
    </v-alert>
  </ValidationObserver>
</template>
<script>
  /**
    * @module components/Index/Form
  */
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-data {Object} form - Correo y contraseña del usuario.
   * @vue-event {} logIn - Valida el usuario y la contraseña registrados.
   * @vue-event {} setEmail - Formatea el usuario digitado para que solo tome el nombre sin el contenido a partir del @.
   * @vue-computed {String} message - Obtiene el mensaje de estado de sesion.
  */
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        isLoading: false
      }
    },
    methods: {
      async logIn() {
        const validate = await this.$refs.formLogin.validate();
        if (validate) {
          try {
            this.isLoading = true;
            await this.$auth.loginWith('laravelJWT', { data: { email: `${this.setEmail(this.form.email).toLowerCase()}@unbosque.edu.co`, password: this.form.password } });
            Alert.showToast('success', 'Bienvenido al Sistema, un momento por favor...');
            this.$store.commit('setMessage', '');
            setTimeout(() => {
              this.isLoading = false;
              this.$router.push('/inventarios/equipos');
            }, 3000);
          } catch (error) {
            this.$store.commit('setMessage', 'Usuario o contraseña incorrecta');
            this.isLoading = false;
          }
        }
      },
      setEmail(formEmail) {
        for (let i = 0; i < formEmail.length; i ++) {
          if (formEmail[i] === '@') {
            formEmail = formEmail.slice(0, i);
            break;
          }
        }
        return formEmail;
      }
    },
    computed: {
      message() {
        return this.$store.state.message;
      }
    },
  }
</script>

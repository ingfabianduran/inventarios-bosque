<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="100" />
    <ValidationObserver
      ref="formEspecialista">
      <v-form
        autocomplete="off"
        @submit.prevent="storeEspecialista">
        <v-card-title class="font-weight-bold">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="cedula"
                rules="required|integer|min_value:10000000|max_value:9999999999">
                <v-text-field
                  v-model="form.cedula"
                  label="Cedula"
                  placeholder="Cedula del Especialista"
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
                name="email"
                rules="required|min:3|max:50">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  placeholder="Email del Especialista"
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
                name="nombre"
                rules="required|min:3|max:50">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre"
                  placeholder="Nombre del Especialista"
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
                name="apellido"
                rules="required|min:3|max:50">
                <v-text-field
                  v-model="form.apellido"
                  label="Apellidos"
                  placeholder="Apellido del Especialista"
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="password"
                rules="required|confirmed:confirmar|min:3">
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="password_confirmation"
                vid="confirmar">
                <v-text-field
                  v-model="form.password_confirmation"
                  :append-icon=" showPassword ? 'mdi-eye' : 'mdi-eye-off' "
                  :type=" showPassword ? 'text' : 'password' "
                  @click:append=" showPassword = !showPassword "
                  label="Confirmar"
                  placeholder="Confirmar la contraseña"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="rol"
                rules="required|oneOf:COORDINADOR,SOPORTE,MESA">
                <v-select
                  v-model="form.rol"
                  label="Rol"
                  outlined
                  :items="roles"
                  color="#7BC142"
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
            {{ this.textBtn }}
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
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        showPassword: false,
        roles: ['COORDINADOR', 'SOPORTE', 'MESA'],
        form: {
          cedula: '',
          email: '',
          nombre: '',
          apellido: '',
          password: '',
          password_confirmation: '',
          rol: ''
        },
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      especialista: {
        type: Object,
        required: false
      },
      url: {
        type: String,
        required: true
      },
      textBtn: {
        type: String,
        required: true
      },
    },
    components: {
      Loader
    },
    methods: {
      async storeEspecialista() {
        const validate = await this.$refs.formEspecialista.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nuevo Especialista') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
                setTimeout(() => {
                  Alert.showToast('success', descripcion);
                  this.isLoading = false;
                  this.clearForm();
                }, 500);
              } catch (error) {
                this.isLoading = false;
              }
            }
          });
        }
      },
      clearForm() {
        this.$refs.formEspecialista.reset();
        this.form.documento = '';
        this.form.correo = '';
        this.form.nombres = '';
        this.form.apellidos = '';
        this.form.password = '';
        this.form.password_confirmation = '';
        this.form.rol = '';
        this.$emit('clearForm');
      }
    },
    watch: {
      especialista() {
        this.form.cedula = this.especialista.cedula;
        this.form.email = this.especialista.email;
        this.form.nombre = this.especialista.nombre;
        this.form.apellido = this.especialista.apellido;
        this.form.password = this.especialista.password;
        this.form.confirmar = this.especialista.password;
        this.form.rol = this.especialista.rol;
      },
      'form.cedula': function(value) {
        if (value !== '') {
          this.form.cedula = parseInt(this.form.cedula);
        }
      },
    }
  }
</script>

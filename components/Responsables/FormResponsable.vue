<template>
  <v-card>
    <Loader :isShow="isLoading" color="#212121" size="90" />
    <ValidationObserver
      ref="formResponsable">
      <v-form
        @submit.prevent="storeResponsable">
        <v-card-title>{{ this.titulo }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:120">
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
                rules="required|min:3|max:60">
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
                name="dependencias"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.dependencia_id"
                  :items="dependencias"
                  color="#7BC142"
                  item-text="nombre"
                  item-value="id"
                  label="Dependencia"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
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
        roles: ['Académico', 'Administrativo', 'Docente', 'Directivo', 'Investigador'],
        dependencias: [],
        form: {
          nombre: '',
          cargo: '',
          tipo: '',
          extension: '',
          dependencia_id: ''
        },
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      responsable: {
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
    async created() {
      await this.getDependencias();
    },
    methods: {
      async getDependencias() {
        const { data } = await this.$axios.$get('api/asignacion/dependencias/i/0');
        this.dependencias = data;
      },
      storeResponsable() {
        Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = (this.titulo === 'Nuevo Responsable') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
      },
      clearForm() {
        this.$refs.formResponsable.reset();
        this.form.nombre = '';
        this.form.cargo = '';
        this.form.tipo = '';
        this.form.extension = '';
        this.form.dependencia_id = '';
        this.$emit('clearForm');
      }
    },
    watch: {
      responsable() {
        this.form.nombre = this.responsable.nombre;
        this.form.cargo = this.responsable.cargo;
        this.form.tipo = this.responsable.tipo;
        this.form.extension = this.responsable.extension;
        this.form.dependencia_id = this.responsable.dependencia_id
      }
    }
  }
</script>

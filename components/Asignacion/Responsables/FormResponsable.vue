<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="90" />
    <ValidationObserver
      ref="formResponsable">
      <v-form
        autocomplete="off"
        @submit.prevent="storeResponsable">
        <v-card-title
          class="font-weight-bold text-h4">
          {{ this.titulo }}
        </v-card-title>
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
                  label="Cargo"
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
                  color="#7BC142"
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
                rules="required|integer|min:4|max:5">
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
                name="dependencia"
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
  /**
   * @vue-data {Array} roles - Almacena los roles que puede tener un responsable.
   * @vue-data {Array} dependencias - Almacena todas las dependencia que puede tener un responsable.
   * @vue-data {boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-data {Object} form - Datos del formulario.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} edificio - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-event {} storeResponsable - Registra o actualiza un responsable.
   * @vue-event {} clearForm - Limpia los datos del formulario.
  */
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
    async fetch() {
      await this.getDependencias();
    },
    methods: {
      async getDependencias() {
        const { data } = await this.$axios.$get('api/asignacion/dependencias/i/0');
        this.dependencias = data;
      },
      async storeResponsable() {
        const validate = await this.$refs.formResponsable.validate();
        if (validate) {
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
        }
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
    /**
      * Watch Events:
      * @property {Function} responsable - Setea los valores del formulario.
    */
    watch: {
      responsable() {
        if (Object.keys(this.responsable).length > 0) {
          this.form.nombre = this.responsable.nombre;
          this.form.cargo = this.responsable.cargo;
          this.form.tipo = this.responsable.tipo;
          this.form.extension = this.responsable.extension;
          if (this.responsable.dependencia !== null) {
            this.form.dependencia_id = this.responsable.dependencia.id;
          }
        }
      }
    }
  }
</script>

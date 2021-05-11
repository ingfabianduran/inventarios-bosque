<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="100" />
    <ValidationObserver
      ref="formMantenimiento">
      <v-form
        autocomplete="off"
        @submit.prevent="storeMantenimiento">
        <v-card-title class="font-weight-bold text-h4">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Correctivo,Preventivo">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors">
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="categoria"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.categoria_id"
                  label="Categoria"
                  :items="categorias"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              :md="(rol === 'COORDINADOR' ? 6 : 12)">
              <ValidationProvider
                v-slot="{ errors }"
                name="equipo"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.equipo_id"
                  :search-input.sync="searchEquipo"
                  label="Equipo"
                  item-text="serie"
                  item-value="id"
                  :items="equipos"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-if="rol === 'COORDINADOR'">
              <ValidationProvider
                v-slot="{ errors }"
                name="tecnico"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.user_id"
                  label="Tecnico"
                  :items="tecnicos"
                  :item-text="item => `${item.nombre} ${item.apellido}`"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="12">
              <ValidationProvider
                v-slot="{ errors }"
                name="tarea realizada"
                rules="required|max:2000">
                <v-textarea
                  v-model="form.tarea_realizada"
                  outlined
                  label="Tareas realizada"
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
            color="#F27830"
            :disabled="stateBtn">
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
  import Loader from '~/components/Site/Loader';
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-data {Array} tipos - Tipos que puede tener un mantenimiento.
   * @vue-data {Array} categorias - Muestra las categorias registradas en el sistema.
   * @vue-data {Array} equipos - Busca los equipos registrados en el sistema.
   * @vue-data {Object} tecnicos - Muestra los tecnicos registrados en el sistema.
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-data {String} searchEquipo - Captura la cadena que permite encontrar un equipo registrado en el sistema.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} [mantenimiento={}] - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-prop {Boolean} [stateBtn=false] - Cadena para el texto del formulario.
   * @vue-event {} getCategorias - Trae las categorias registradas en el sistema.
   * @vue-event {} getTecnicos - Trae los tecnicos registrados en el sistema.
   * @vue-event {} storeMantenimiento - Registra o actualiza un mantenimiento.
   * @vue-event {} clearForm - Limpia los datos del formulario.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        tipos: ['Correctivo', 'Preventivo'],
        categorias: [],
        equipos: [],
        tecnicos: [],
        form: {
          tipo: '',
          tarea_realizada: '',
          user_id: '',
          categoria_id: '',
          equipo_id: ''
        },
        isLoading: false,
        searchEquipo: ''
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      mantenimiento: {
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
      stateBtn: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Loader
    },
    async fetch() {
      await this.getCategorias();
      if (this.$auth.user.rol === 'COORDINADOR') {
        await this.getTecnicos();
      }
    },
    methods: {
      async getCategorias() {
        const { data } = await this.$axios.$get('api/mantenimiento/categorias/i/0');
        this.categorias = data;
      },
      async getTecnicos() {
        const { data } = await this.$axios.$get('api/mantenimiento/users/i/0');
        this.tecnicos = data;
      },
      async storeMantenimiento() {
        const validate = await this.$refs.formMantenimiento.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.form.user_id = this.$auth.user.id;
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nuevo Mantenimiento' ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form));
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
        this.$refs.formMantenimiento.reset();
        this.form.tipo = '';
        this.form.tarea_realizada = '';
        if (this.$auth.user.rol === 'COORDINADOR') {
          this.form.user_id = '';
        }
        this.form.categoria_id = '';
        this.form.equipo_id = '';
        this.$emit('clearForm');
      },
    },
    /**
      * Watch Events:
      * @property {Function} mantenimiento - Setea los valores del formulario.
      * @property {Function} searchEquipo - Realiza la busqueda del equipo, mientras es digitado sobre el input.
    */
    watch: {
      mantenimiento() {
        if (Object.keys(this.mantenimiento).length > 0) {
          this.form.tipo = this.mantenimiento.tipo;
          this.form.tarea_realizada = this.mantenimiento.tarea_realizada;
          this.form.user_id = this.mantenimiento.user_id;
          if (this.mantenimiento.categoria !== null) {
            this.form.categoria_id = this.mantenimiento.categoria.id;
          }
          if (this.mantenimiento.equipo !== null) {
            this.form.equipo_id = this.mantenimiento.equipo.id;
            this.searchEquipo = this.mantenimiento.equipo.serie;
          }
        }
      },
      async searchEquipo(value) {
        if (value !== null && value.length > 0) {
          const { data } = await this.$axios.$get(`api/inventario/equipos/buscar/${value}`);
          this.equipos = data.data;
        }
      }
    },
    computed: {
      rol() {
        return this.$auth.user.rol;
      }
    }
  }
</script>

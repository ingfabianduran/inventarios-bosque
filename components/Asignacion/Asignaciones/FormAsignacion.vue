<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="90" />
    <ValidationObserver
      ref="formAsignacion">
      <v-form
        autocomplete="off"
        @submit.prevent="storeAsignacion">
        <v-card-title
          class="font-weight-bold text-h4">
          {{ this.titulo }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Academico,Administrativo,Servicio al estudiante">
                <v-autocomplete
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="6">
              <ValidationProvider
                v-slot="{ errors }"
                name="responsable_id"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.responsable_id"
                  :search-input.sync="searchResponsable"
                  label="Responsable"
                  :items="responsables"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="1">
              <v-checkbox
                v-model="form.estado"
                label="Estado"
                color="#F27830">
              </v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="edificio"
                rules="required|integer">
                <v-autocomplete
                  v-model="edificio"
                  label="Edificio"
                  :items="edificios"
                  item-text="nombre"
                  item-value="id"
                  color="#7BC142"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="espacio_id"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.espacio_id"
                  label="Espacio"
                  :items="espacios"
                  item-text="nombre"
                  item-value="id"
                  color="#7BC142"
                  outlined
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="equipo_id"
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
  /**
    * @module components/Asignacion/Asignaciones/FormAsignacion
  */
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';
  import { mapGetters } from 'vuex';
  /**
   * @vue-data {Array} tipos - Almacena todos los tipos de espacio que puede tener una asignación.
   * @vue-data {Array} edificios - Muestra los edificios registrados en el sistema.
   * @vue-data {Array} espacios - Muestra los espacios asociados al edificio seleccionado.
   * @vue-data {Array} responsables - Busca los responsables registrados en el sistema.
   * @vue-data {Array} equipos - Busca los equipos registrados en el sistema.
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {String} edificio - Cadena que permite encontrar un edificio.
   * @vue-data {String} searchResponsable - Cadena que permite encontrar un responsable.
   * @vue-data {String} searchEquipo - Cadena que permite encontrar un equipo.
   * @vue-data {Boolean} isLoading - Valida el estado de carga del formulario.
   * @vue-prop {String} titulo - Titulo especificado en el v-card-title del componente.
   * @vue-prop {Object} [asignacion={}] - Captura los datos y los ingresa en el formulario.
   * @vue-prop {String} url - Cadena para ejecutar la peticion POST y PUT.
   * @vue-prop {String} textBtn - Cadena para el texto del formulario.
   * @vue-event {} storeAsignacion - Registra o actualiza una asignación.
   * @vue-event {} clearForm - Limpia los datos del formulario.
   * @vue-computed {Object} getValues - Obtiene los config para los formularios.
   * @vue-computed {Array} tipos - Obtiene los tipos de asignación.
  */
  export default {
    data() {
      return {
        edificios: [],
        espacios: [],
        responsables: [],
        equipos: [],
        form: {
          tipo: '',
          estado: false,
          responsable_id: '',
          espacio_id: '',
          equipo_id: ''
        },
        edificio: '',
        searchResponsable: '',
        searchEquipo: '',
        isLoading: false
      }
    },
    props: {
      titulo: {
        type: String,
        required: true
      },
      asignacion: {
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
      await this.getEdificios();
    },
    methods: {
      async getEdificios() {
        const { data } = await this.$axios.$get('api/asignacion/edificios/i/0');
        this.edificios = data;
      },
      async storeAsignacion() {
        const validate = await this.$refs.formAsignacion.validate();
        if (validate) {
          Alert.showConfirm(this.titulo, `¿Esta seguro de realizar la petición?`, 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                const { descripcion } = (this.titulo === 'Nueva Asignación') ? await this.$axios.$post(this.url, this.form) : await this.$axios.$put(this.url, this.form);
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
        this.$refs.formAsignacion.reset();
        this.form.tipo = '';
        this.form.estado = false;
        this.form.responsable_id = '';
        this.form.espacio_id = '';
        this.form.equipo_id = '';
        this.espacios = [];
        this.responsables = [];
        this.equipos = [];
        this.edificio = '';
        this.searchResponsable = '';
        this.searchEquipo = '';
        this.$emit('clearForm');
      }
    },
    /**
      * Watch Events:
      * @property {Function} asignacion - Setea los valores del formulario.
      * @property {Function} searchResponsable - Permite buscar un responsable y mostrarlo en la lista.
      * @property {Function} searchEquipo - Permite buscar un equipo y mostrarlo en la lista.
      * @property {Function} edificio - Cuando el valor del edificio cambia, este trae todos los espacios asociados al edificio seleccionado.
    */
    watch: {
      asignacion() {
        if (Object.keys(this.asignacion).length > 0) {
          this.form.tipo = this.asignacion.tipo;
          this.form.estado = (this.asignacion.estado === 1) ? true : false;

          if (this.asignacion.espacio !== null) {
            this.form.espacio_id = this.asignacion.espacio.id;
            this.edificio = this.asignacion.espacio.edificio_id;
          }

          if (this.asignacion.responsable !== null) {
            this.form.responsable_id = this.asignacion.responsable.id;
            this.searchResponsable = this.asignacion.responsable.nombre;
          }

          this.form.equipo_id = this.asignacion.equipo_id;
          this.searchEquipo = this.asignacion.equipo.serie;
        }
      },
      async searchResponsable(value) {
        if (value !== null && value.length > 0) {
          const { data } = await this.$axios.$get(`/api/asignacion/responsables/buscar/nombre/${value}`);
          this.responsables = data.data;
        }
      },
      async searchEquipo(value) {
         if (value !== null && value.length > 0) {
           const { data } = await this.$axios.$get(`api/inventario/equipos/buscar/${value}`);
           this.equipos = data.data;
         }
      },
      async edificio(value) {
        const { data } = await this.$axios.$get(`api/asignacion/edificios/${value}`);
        this.espacios = data.espacios;
      }
    },
    computed: {
      ...mapGetters([
        'getValues'
      ]),
      tipos() {
        return this.getValues('asignacion');
      }
    }
  }
</script>

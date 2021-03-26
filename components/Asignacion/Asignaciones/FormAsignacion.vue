<template>
  <v-card
    outlined>
    <Loader :isShow="isLoading" color="#212121" size="90" />
    <ValidationObserver
      ref="formAsignacion">
      <v-form
        @submit.prevent="storeAsignacion">
        <v-card-title
          class="font-weight-bold">
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
                rules="required|oneOf:Aulas,Oficinas">
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
  import Alert from '~/components/Site/SweetAlert';
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        tipos: ['Aulas', 'Oficinas'],
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
      await this.getEspacios();
    },
    methods: {
      async getEdificios() {
        const { data } = await this.$axios.$get('api/asignacion/edificios/i/0');
        this.edificios = data;
      },
      async getEspacios() {
        const { data } = await this.$axios.$get('api/asignacion/espacios/i/0');
        this.espacios = data;
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
        this.edificio = '';
        this.searchResponsable = '';
        this.responsables = [];
        this.searchEquipo = '';
        this.$emit('clearForm');
      }
    },
    watch: {
      asignacion() {
        this.form.tipo = this.asignacion.tipo;
        this.form.estado = (this.asignacion.estado === 1) ? true : false;
        this.form.responsable_id = this.asignacion.responsable_id;
        this.form.espacio_id = this.asignacion.espacio_id;
        this.form.equipo_id = this.asignacion.equipo_id;
        this.edificio = (this.asignacion.hasOwnProperty('espacio') ? this.asignacion.espacio.edificio_id : '');
        this.searchResponsable = (this.asignacion.hasOwnProperty('responsable') ? this.asignacion.responsable.nombre : '');
        this.searchEquipo = (this.asignacion.hasOwnProperty('equipo') ? this.asignacion.equipo.serie : '');
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
      }
    }
  }
</script>

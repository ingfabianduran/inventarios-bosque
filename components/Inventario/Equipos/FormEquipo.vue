<template>
  <v-card>
    <ValidationObserver
      ref="formEquipo">
      <v-form
        autocomplete="off"
        @submit.prevent="storeEquipo">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="2"
              v-if="Object.keys(equipo).length === 0">
              <v-checkbox
                v-model="isMasiva"
                label="Creación Masiva"
                color="#F27830">
              </v-checkbox>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="modelo"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.modelo_id"
                  label="Modelo"
                  item-text="descripcion"
                  item-value="id"
                  :items="modelos"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              :md="(Object.keys(equipo).length > 0 ? 4 : 3)">
              <ValidationProvider
                v-slot="{ errors }"
                name="compra"
                rules="required">
                <v-text-field
                  v-model="form.fecha_compra"
                  label="Compra"
                  placeholder="Fecha de la compra del equipo"
                  v-mask="'##-##-####'"
                  prepend-inner-icon="mdi-calendar-month"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              :md="(Object.keys(equipo).length > 0 ? 4 : 3)">
              <ValidationProvider
                v-slot="{ errors }"
                name="garantia"
                rules="required">
                <v-text-field
                  v-model="form.vence_garantia"
                  label="Garatia"
                  placeholder="Fecha de la garantia del equipo"
                  v-mask="'##-##-####'"
                  prepend-inner-icon="mdi-calendar-month"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
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
                name="tipo"
                rules="required|oneOf:Compra,Leasing">
                <v-select
                  v-model="form.tipo"
                  label="Tipo"
                  outlined
                  :items="tipos"
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-select>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <template v-if="!isMasiva">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="serie"
                  rules="required|min:3|max:100">
                  <v-text-field
                    v-model="form.serie"
                    label="Serie"
                    placeholder="Serie del equipo"
                    outlined
                    color="#7BC142"
                    :error-messages="errors"
                    :disabled="rol === 'COORDINADOR' ? false : true">
                  </v-text-field>
                </ValidationProvider>
              </template>
              <template v-else>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="file"
                  rules="required">
                  <v-file-input
                    accept=".xlsx"
                    v-model="form.file"
                    placeholder="Series"
                    outlined
                    color="#7BC142"
                    prepend-icon=""
                    prepend-inner-icon="mdi-file-table"
                    :error-messages="errors"
                    :disabled="rol === 'COORDINADOR' ? false : true">
                  </v-file-input>
                </ValidationProvider>
              </template>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="valor"
                rules="required">
                <v-text-field
                  v-model="form.valor"
                  label="Valor"
                  placeholder="Valor del equipo"
                  prepend-inner-icon="mdi-currency-usd"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              :md="(!showMemorias ? 12 : 6)"
              v-if="showDiscos">
              <ValidationProvider
                v-slot="{ errors }"
                name="disco"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.disco_id"
                  label="Disco Duro"
                  :item-text="item => `${item.tipo} ${item.capacidad}`"
                  item-value="id"
                  :items="discos"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              :md="(!showDiscos ? 12 : 6)"
              v-if="showMemorias">
              <ValidationProvider
                v-slot="{ errors }"
                name="memoria"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.memoria_id"
                  label="Memoria Ram"
                  :item-text="item => `${item.tipo} ${item.capacidad}`"
                  item-value="id"
                  :items="memorias"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
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
            Siguiente
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
    * @module components/Inventario/Equipos/FormEquipo
  */
  import moment from 'moment';
  import { mapGetters } from 'vuex';
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Tipos que puede tener un equipo.
   * @vue-data {Array} modelos - Muestra los modelos registrados en el sistema.
   * @vue-data {Array} discos - Muestra los discos registrados en el sistema.
   * @vue-data {Array} memorias - Muestra las memorias registradas en el sistema.
   * @vue-data {Boolean} [isMasiva=true] - Determina si se muestra o no el input para la serie.
   * @vue-prop {Boolean} [showDiscos=true] - Determina si se muestra o no el v-autocomplete para discos.
   * @vue-prop {Boolean} [showMemorias=true] - Determina si se muestra o no el v-autocomplete para memorias.
   * @vue-prop {Object} [equipo={}] - Captura los datos y los ingresa en el formulario.
   * @vue-event {} getModelos - Trae los modelos registrados en el sistema.
   * @vue-event {} getDiscos - Trae los discos registrados en el sistema.
   * @vue-event {} getMemorias - Trae las memorias registradas en el sistema.
   * @vue-event {} storeEquipo - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {Object} getValues - Obtiene los config para los formularios.
   * @vue-computed {Array} tipos - Obtiene los tipos de adquisición de un equipo.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        form: {
          fecha_compra: '01-01-2020',
          vence_garantia: '01-01-2021',
          tipo: 'Compra',
          file: null,
          serie: 'MJ6302563',
          valor: '3000000',
          modelo_id: 1,
          disco_id: 1,
          memoria_id: 1
        },
        modelos: [],
        discos: [],
        memorias: [],
        isMasiva: false
      }
    },
    props: {
      showDiscos: {
        type: Boolean,
        default: true
      },
      showMemorias: {
        type: Boolean,
        default: true
      },
      equipo: {
        type: Object,
        required: false
      }
    },
    async fetch() {
      await this.getModelos();
      await this.getDiscos();
      await this.getMemorias();
    },
    methods: {
      async getModelos() {
        const { data } = await this.$axios.$get('api/inventario/modelos/i/0');
        this.modelos = data;
      },
      async getDiscos() {
        const { data } = await this.$axios.$get('api/inventario/discos/i/0');
        this.discos = data;
      },
      async getMemorias() {
        const { data } = await this.$axios.$get('api/inventario/memorias/i/0');
        this.memorias = data;
      },
      async storeEquipo() {
        const validate = await this.$refs.formEquipo.validate();
        if (validate) {
          const data = {
            form: this.form,
            isMasiva: this.isMasiva
          };
          this.$emit('getEquipo', data);
        }
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formEquipo.reset();
        this.form.fecha_compra = '';
        this.form.vence_garantia = '';
        this.form.tipo = '';
        this.form.serie = '';
        this.form.valor = '';
        this.form.modelo_id = '';
        this.form.disco_id = '';
        this.form.memoria_id = '';
        this.isMasiva = false;
      }
    },
    /**
      * Watch Events:
      * @property {Function} equipo - Setea los valores del formulario.
    */
    watch: {
      equipo() {
        this.form.fecha_compra = moment(this.equipo.fecha_compra).format('DD-MM-YYYY');
        this.form.vence_garantia = moment(this.equipo.vence_garantia).format('DD-MM-YYYY');
        this.form.tipo = this.equipo.tipo;
        this.form.serie = this.equipo.serie;
        this.form.valor = this.equipo.valor;

        if (this.equipo.modelo !== null) {
          this.form.modelo_id = this.equipo.modelo.id;
        }

        if (this.equipo.disco !== null) {
          this.form.disco_id = this.equipo.disco.id;
        }

        if (this.equipo.memoria !== null) {
          this.form.memoria_id = this.equipo.memoria.id;
        }
      }
    },
    computed: {
      ...mapGetters([
        'getValues'
      ]),
      tipos() {
        return this.getValues('equipo');
      },
      rol() {
        return this.$auth.user.rol;
      }
    }
  }
</script>

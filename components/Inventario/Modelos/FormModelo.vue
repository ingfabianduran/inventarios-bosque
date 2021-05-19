<template>
  <v-card>
    <ValidationObserver
      ref="formModelo">
      <v-form
        autocomplete="off"
        @submit.prevent="storeModelo">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="nombre"
                rules="required|min:3|max:60">
                <v-text-field
                  v-model="form.descripcion"
                  label="Descripción"
                  placeholder="Descripción de la marca"
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
                name="tipo"
                rules="required|oneOf:All in One,Desktop,Portatil,Portatil Mini,Tablet,Tiny,WorkStation">
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
              md="2">
              <ValidationProvider
                v-slot="{ errors }"
                name="modulos de memoria"
                rules="integer">
                <v-text-field
                  v-model="form.modulos_memoria"
                  label="Modulos"
                  placeholder="Modulos de memoria"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="marca"
              cols="12"
              :md="(procesador && marca) ? 6 : 12">
              <ValidationProvider
                v-slot="{ errors }"
                name="marca"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.marca_id"
                  label="Marca"
                  :items="marcas"
                  item-text="nombre"
                  item-value="id"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              v-if="procesador"
              cols="12"
              :md="(procesador && marca) ? 6 : 12">
              <ValidationProvider
                v-slot="{ errors }"
                name="procesador"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.procesador_id"
                  label="Procesador"
                  :items="procesadores"
                  item-text="nombre"
                  item-value="id"
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
            Finalizar
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
    * @module components/Inventario/Modelos/FormModelo
  */
  import { mapGetters } from 'vuex';
  /**
   * @vue-data {Object} form - Datos del formulario.
   * @vue-data {Array} tipos - Muestra los tipos que puede tener un modelo.
   * @vue-data {Array} marcas - Muestra las marcas registradas en el sistema.
   * @vue-data {Array} procesadores - Muestra los procesadores registrados en el sistema.
   * @vue-prop {Boolean} [marca=true] - Valida si se muestra o no las marcas registradas.
   * @vue-prop {Boolean} [procesador=true] - Valida si se muestra o no los procesadores registradas.
   * @vue-prop {Object} [modelo={}] - Valida si se muestra o no los procesadores registradas.
   * @vue-event {} storeCaracteristica - Valida y envia la informacion del formulario al componente padre.
   * @vue-event {} omitir - Emite el evento omitir al componente padre.
   * @vue-event {} clearForm - Limpia los datos del formulario y emite el evento clearForm al componente padre.
   * @vue-event {} resetData - Limpia los datos del formulario.
   * @vue-computed {Object} getValues - Obtiene los config para los formularios.
   * @vue-computed {Array} tipos - Obtiene los tipos de modelo.
  */
  export default {
    data() {
      return {
        form: {
          descripcion: '',
          tipo: '',
          modulos_memoria: '',
          marca_id: '',
          procesador_id: '',
        },
        marcas: [],
        procesadores: []
      }
    },
    props: {
      marca: {
        type: Boolean,
        default: true,
      },
      procesador: {
        type: Boolean,
        default: true
      },
      modelo: {
        type: Object,
        required: false
      },
    },
    async fetch() {
      await this.getMarcas();
      await this.getProcesadores();
    },
    methods: {
      async getMarcas() {
        const { data } = await this.$axios.$get('api/inventario/marcas/i/0');
        this.marcas = data;
      },
      async getProcesadores() {
        const { data } = await this.$axios.$get('api/inventario/procesadores/i/0');
        this.procesadores = data;
      },
      async storeModelo() {
        const validate = await this.$refs.formModelo.validate();
        if (validate) {
          this.$emit('getModelo', this.form);
        }
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formModelo.reset();
        this.form.descripcion = '';
        this.form.tipo = '';
        this.form.modulos_memoria = '';
        this.form.marca_id = '';
        this.form.procesador_id = '';
      }
    },
    watch: {
      modelo() {
        this.form.descripcion = this.modelo.descripcion;
        this.form.tipo = this.modelo.tipo;
        this.form.modulos_memoria = this.modelo.modulos_memoria;

        if (this.modelo.marca !== null) {
          this.form.marca_id = this.modelo.marca_id;
        }

        if (this.modelo.procesador !== null) {
          this.form.procesador_id = this.modelo.procesador_id;
        }
      }
    },
    computed: {
      ...mapGetters([
        'getValues'
      ]),
      tipos() {
        return this.getValues('modelo');
      }
    }
  }
</script>

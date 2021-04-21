<template>
  <v-card>
    <ValidationObserver
      ref="formEquipo">
      <v-form
        @submit.prevent="storeEquipo">
        <v-card-text>
          <v-row>
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
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="compra"
                rules="required">
                <v-text-field
                  v-model="form.fecha_compra"
                  label="Compra"
                  placeholder="Fecha de la compra del equipo"
                  v-mask="'##-##-####'"
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="rol === 'COORDINADOR' ? false : true">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="garantia"
                rules="required">
                <v-text-field
                  v-model="form.vence_garantia"
                  label="Garatia"
                  placeholder="Fecha de la garantia del equipo"
                  v-mask="'##-##-####'"
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
                  :item-text="item => item.tipo +' - '+ item.capacidad"
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
                  :item-text="item => item.tipo +' - '+ item.capacidad"
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
  import moment from 'moment';

  export default {
    data() {
      return {
        form: {
          fecha_compra: '',
          vence_garantia: '',
          tipo: '',
          serie: '',
          valor: '',
          modelo_id: '',
          disco_id: '',
          memoria_id: ''
        },
        tipos: ['Compra', 'Leasing'],
        modelos: [],
        discos: [],
        memorias: [],
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
          this.$emit('getEquipo', this.form);
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
      }
    },
    watch: {
      equipo() {
        this.form.fecha_compra = moment(this.equipo.fecha_compra).format('DD-MM-YYYY');
        this.form.vence_garantia = moment(this.equipo.vence_garantia).format('DD-MM-YYYY');
        this.form.tipo = this.equipo.tipo;
        this.form.serie = this.equipo.serie;
        this.form.valor = this.equipo.valor;
        this.form.modelo_id = this.equipo.modelo.id;
        this.form.disco_id = this.equipo.disco.id;
        this.form.memoria_id = this.equipo.memoria.id;
      }
    },
    computed: {
      rol() {
        return this.$auth.user.rol;
      }
    }
  }
</script>

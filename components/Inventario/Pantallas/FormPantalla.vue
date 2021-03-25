<template>
  <v-card>
    <Loader :isShow="isLoading" color="#212121" size="80" />
    <v-card-title
      v-if="titulo !== ''"
      class="font-weight-bold">
      {{ this.titulo }}
    </v-card-title>
    <ValidationObserver
      ref="formPantalla">
      <v-form
        @submit.prevent="storeMarca">
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              :md="(!marca) ? 6 : 4">
              <ValidationProvider
                v-slot="{ errors }"
                name="pulgadas"
                rules="required|integer">
                <v-text-field
                  v-model="form.pulgadas"
                  label="Pulgadas"
                  placeholder="Pulgadas de la pantalla"
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              :md="(!marca) ? 6 : 4">
              <ValidationProvider
                v-slot="{ errors }"
                name="tipo"
                rules="required|oneOf:Externa,Integrada">
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
              md="4"
              v-if="marca">
              <ValidationProvider
                v-slot="{ errors }"
                name="marca"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.marca_id"
                  label="Marca"
                  item-text="nombre"
                  item-value="id"
                  :items="marcas"
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
  import Loader from '~/components/Site/Loader';

  export default {
    data() {
      return {
        form: {
          pulgadas: '',
          tipo: '',
          marca_id: ''
        },
        tipos: ['Externa', 'Integrada'],
        marcas: []
      }
    },
    props: {
      titulo: {
        type: String,
        required: false
      },
      marca: {
        type: Boolean,
        default: false,
      },
      pantalla: {
        type: Object,
        required: false
      },
      textBtn: {
        type: String,
        default: 'Finalizar'
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Loader
    },
    async fetch() {
      await this.getMarcas();
    },
    methods: {
      async getMarcas() {
        const { data } = await this.$axios.$get('api/inventario/marcas/i/0');
        this.marcas = data;
      },
      async storeMarca() {
        const validate = await this.$refs.formPantalla.validate();
        if (validate) {
          this.$emit('getPantalla', this.form);
        }
      },
      clearForm() {
        this.resetData();
        this.$emit('clearForm');
      },
      resetData() {
        this.$refs.formPantalla.reset();
        this.form.pulgadas = '';
        this.form.tipo = '';
        this.form.marca_id = '';
      }
    },
    watch: {
      pantalla() {
        this.form.pulgadas = this.pantalla.pulgadas;
        this.form.tipo = this.pantalla.tipo;
        this.form.marca_id = this.pantalla.marca_id;
      }
    }
  }
</script>

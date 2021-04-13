<template>
  <v-card flat>
    <Loader :isShow="isLoading" color="#212121" size="60" />
    <v-card-text>
      <ValidationObserver
        ref="formAddSistema">
        <v-form
          @submit.prevent="storeSistema">
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="sistema"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.sistema_operativo_id"
                  label="Nombre"
                  :items="items"
                  item-text="nombre"
                  item-value="id"
                  dense
                  outlined
                  color="#7BC142"
                  :error-messages="errors">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <ValidationProvider
                v-slot="{ errors }"
                name="compilacion"
                rules="required|min:2|max:10">
                <v-text-field
                  v-model="form.compilacion"
                  label="Compilacion"
                  placeholder="Compilación del Sistema"
                  outlined
                  dense
                  color="#7BC142"
                  :error-messages="errors">
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="3"
              class="text-center">
              <v-btn
                type="submit"
                elevation="2"
                fab
                dark
                x-small
                color="#F27830">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
              <v-btn
                type="button"
                elevation="2"
                fab
                dark
                x-small
                color="#7BC142"
                @click="clearForm()">
                <v-icon dark>
                  mdi-window-close
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
      <Sistemas :headers="headers" :items="sistemas" :url="url" titulo="Modificar Sistemas Operativos" @updateListItems="getSistemas" />
    </v-card-text>
  </v-card>
</template>
<script>
  import Loader from '~/components/Site/Loader'
  import Sistemas from '~/components/Site/MiniTable';
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        form: {
          compilacion: '',
          sistema_operativo_id: ''
        },
        items: [],
        headers: [
          { text: 'Nombre', value: 'nombre', sortable: false },
          { text: 'Fecha de Instalación', value: 'pivot.created_at', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        sistemas: [],
        url: `api/inventario/equiposistemaoperativos/${this.id}`,
        isLoading: false
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    components: {
      Sistemas,
      Loader
    },
    async fetch() {
      const { data } = await this.$axios.$get('api/inventario/sistemaoperativos/i/0');
      this.items = data;
      await this.getSistemas();
    },
    methods: {
      async getSistemas() {
        const { data } = await this.$axios.$get(`api/inventario/equiposistemaoperativos/${this.id}`);
        this.sistemas = data;
      },
      async storeSistema() {
        const validate = await this.$refs.formAddSistema.validate();
        if (validate) {
          Alert.showConfirm('Agregar Sistema Operativo', 'Esta seguro de realizar la petición', 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                let listSistemas = this.sistemas.map((sistema) => {
                  return { compilacion: '20H2', sistema_operativo_id: sistema.pivot.sistema_operativo_id }
                });
                listSistemas.push(this.form);
                const { descripcion } = await this.$axios.$put(`api/inventario/equiposistemaoperativos/${this.id}`, listSistemas);
                setTimeout(async() => {
                  this.isLoading = false;
                  Alert.showToast('success', descripcion);
                  this.clearForm();
                  await this.getSistemas();
                }, 1000);
              } catch (error) {
                this.isLoading = false;
              }
            }
          });
        }
      },
      clearForm() {
        this.$refs.formAddSistema.reset();
        this.form.compilacion = '';
        this.form.sistema_operativo_id = '';
      }
    }
  }
</script>

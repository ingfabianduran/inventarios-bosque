<template>
  <v-card flat>
    <Loader :isShow="isLoading" color="#212121" size="60" />
    <v-card-text>
      <ValidationObserver
        ref="formAddSoftware">
        <v-form
          @submit.prevent="storeSoftware">
          <v-row>
            <v-col
              cols="12"
              md="10">
              <ValidationProvider
                v-slot="{ errors }"
                name="software"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.software_id"
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
              md="2"
              class="text-center">
              <v-btn
                type="submit"
                elevation="2"
                class="mr-1"
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
      <Softwares :headers="headers" :items="softwares" titulo="Modificar Software" @itemSelect="updateSoftware" />
    </v-card-text>
  </v-card>
</template>
<script>
  import Loader from '~/components/Site/Loader';
  import Softwares from '~/components/Site/MiniTable';
  import Alert from '~/components/Site/SweetAlert';

  export default {
    data() {
      return {
        form: {
          software_id: ''
        },
        items: [],
        headers: [
          { text: 'Nombre', value: 'nombre', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Fecha de Instalación', value: 'pivot.created_at', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        softwares: [],
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
      Loader,
      Softwares
    },
    async fetch() {
      const { data } = await this.$axios.$get('api/inventario/softwares/i/0');
      this.items = data;
      await this.getSoftwares();
    },
    methods: {
      async getSoftwares() {
        const { data } = await this.$axios.$get(`api/inventario/equiposoftware/${this.id}`);
        this.softwares = data;
      },
      async storeSoftware() {
        const validate = await this.$refs.formAddSoftware.validate();
        if (validate) {
          Alert.showConfirm('Agregar Software', 'Esta seguro de realizar la petición', 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                let listSoftwares = this.softwares.map((software) => {
                  return { software_id: software.pivot.software_id }
                });
                listSoftwares.push(this.form);
                const { descripcion } = await this.$axios.$put(`/api/inventario/equiposoftware/${this.id}`, listSoftwares);
                setTimeout(async() => {
                  this.isLoading = false;
                  Alert.showToast('success', descripcion);
                  this.clearForm();
                  await this.getSoftwares();
                }, 1000);
              } catch (error) {
                this.isLoading = false;
              }
            }
          });
        }
      },
      async updateSoftware(software) {
        try {
          this.isLoading = true;
          const listSoftware = [];
          for (const i in this.softwares) {
            if (this.softwares[i].pivot.software_id !== software.pivot.software_id) {
              listSoftware.push({ software_id: this.softwares[i].pivot.software_id });
            }
          }
          const { descripcion } = await this.$axios.$put(`api/inventario/equiposoftware/${this.id}`, listSoftware);
          setTimeout(async () => {
            this.isLoading = false;
            Alert.showToast('success', descripcion);
            await this.getSoftwares();
          }, 1000);
        } catch (error) {
          this.isLoading = false;
        }
      },
      clearForm() {
        this.$refs.formAddSoftware.reset();
        this.form.software_id = '';
      }
    }
  }
</script>

<template>
  <v-card flat>
    <Loader :isShow="isLoading" color="#212121" size="60" />
    <v-card-text>
      <ValidationObserver
        ref="formAddPantalla">
        <v-form
          autocomplete="off"
          @submit.prevent="storePantalla"
          v-if="rol !== 'MESA'">
          <v-row>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="pantalla"
                rules="required|integer">
                <v-autocomplete
                  v-model="form.pantalla_id"
                  label="Pantalla"
                  :items="items"
                  :item-text="item => `${item.marca.nombre} - ${item.pulgadas}`"
                  item-value="id"
                  dense
                  outlined
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="(rol === 'MESA' ? true : false)">
                </v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              md="5">
              <ValidationProvider
                v-slot="{ errors }"
                name="serial"
                rules="required|min:3|max:100">
                <v-text-field
                  v-model="form.serial"
                  label="Serial"
                  placeholder="Serial de la pantalla"
                  outlined
                  dense
                  color="#7BC142"
                  :error-messages="errors"
                  :disabled="(rol === 'MESA' ? true : false)">
                </v-text-field>
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
      <Pantallas :headers="headers" :items="pantallas" titulo="Modificar Pantallas" @itemSelect="updatePantalla" />
    </v-card-text>
  </v-card>
</template>
<script>
  /**
    * @module components/Inventario/Pantallas/CarritoPantalla
  */
  import Loader from '~/components/Site/Loader';
  import Pantallas from '~/components/Site/MiniTable';
  import Alert from '~/components/Site/SweetAlert';
  /**
   * @vue-data {Object} form - Información para agregar una nueva pantalla.
   * @vue-data {Array} items - Listado de pantallas que tiene el equipo.
   * @vue-data {Array} headers - Columnas de la tabla Pantallas.
   * @vue-data {Array} pantallas - Listado de pantallas registradas en el sistema.
   * @vue-data {Boolean} isLoading - Habilita o no la barra de carga sobre el componente.
   * @vue-prop {Number} id - Identificador del equipo seleccionado en el componente padre.
   * @vue-event {} getPantallas - Consulta las pantallas registradas en el sistema.
   * @vue-event {} storePantalla - Asocia una pantalla al equipo seleccionado.
   * @vue-event {Object} updatePantalla - Actualiza la información de las pantallas asociadas al equipo.
   * @vue-event {} clearForm - Setea el valor de la variable form.
   * @vue-computed {String} rol - Obtiene el rol del usuario activo en la sesion.
  */
  export default {
    data() {
      return {
        form: {
          serial: '',
          pantalla_id: ''
        },
        items: [],
        headers: [
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Pulgadas', value: 'pulgadas', sortable: false },
          { text: 'Marca', value: 'marca.nombre', sortable: false },
          { text: 'Serial', value: 'pivot.serial', sortable: false },
          { text: 'Fecha', value: 'pivot.created_at', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        pantallas: [],
        isLoading: false
      }
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    components: {
      Loader,
      Pantallas
    },
    async fetch() {
       if (this.$auth.user.rol !== 'MESA') {
        let { data } = await this.$axios.$get('api/inventario/pantallas/i/0');
        this.items = data;
       }
      await this.getPantallas();
    },
    methods: {
      async getPantallas() {
        const { data } = await this.$axios.$get(`api/inventario/equipopantallas/${this.id}`);
        this.pantallas = data;
      },
      async storePantalla() {
        const validate = await this.$refs.formAddPantalla.validate();
        if (validate) {
          Alert.showConfirm('Agregar Pantalla', 'Esta seguro de realizar la petición', 'question', async(confirmed) => {
            if (confirmed) {
              try {
                this.isLoading = true;
                let listPantallas = this.pantallas.map((pantalla) => {
                  return { serial: pantalla.pivot.serial, pantalla_id: pantalla.pivot.pantalla_id }
                });
                listPantallas.push(this.form);
                const { descripcion } = await this.$axios.$put(`api/inventario/equipopantallas/${this.id}`, listPantallas);
                setTimeout(async() => {
                  this.isLoading = false;
                  Alert.showToast('success', descripcion);
                  this.clearForm();
                  await this.getPantallas();
                }, 1000);
              } catch (error) {
                this.isLoading = false;
              }
            }
          });
        }
      },
      async updatePantalla(pantalla) {
        try {
          this.isLoading = true;
          const listPantalla = [];
          for (const i in this.pantallas) {
            if (this.pantallas[i].pivot.pantalla_id !== pantalla.pivot.pantalla_id) {
              listPantalla.push({ pantalla_id: this.pantallas[i].pivot.pantalla_id, serial: this.pantallas[i].pivot.serial });
            }
          }
          const { descripcion } = await this.$axios.$put(`api/inventario/equipopantallas/${this.id}`, listPantalla);
          setTimeout(async () => {
            this.isLoading = false;
            Alert.showToast('success', descripcion);
            await this.getPantallas();
          }, 1000);
        } catch (error) {
          this.isLoading = false;
        }
      },
      clearForm() {
        this.$refs.formAddPantalla.reset();
        this.form.serial = '';
        this.form.pantalla_id = '';
      }
    },
    computed: {
      rol () {
        return this.$auth.user.rol;
      }
    }
  }
</script>

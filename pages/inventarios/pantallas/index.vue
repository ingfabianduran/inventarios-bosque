<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col>
        <Pantalla v-show="!isViewPantallaUpdate" @listPantallas="$fetch" />
        <PantallaUpdate
          v-show="isViewPantallaUpdate"
          titulo="Actualizar Pantalla"
          textBtn="Actualizar"
          :pantalla="pantalla"
          :marca="true"
          :isLoading="isLoading"
          @getPantalla="updatePantalla"
          @clearForm="isViewPantallaUpdate = false" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table
          title="Pantallas"
          :headers="headers"
          :items="pantallas"
          url="api/inventario/pantallas/"
          :search="search"
          @getModel="getPantalla"
          @updateModels="$fetch"
          @resetBusqueda="$fetch"
          @searchModel="searchListPantallas" />
      </v-col>
    </v-row>
    <Pagination :page="page" @getData="updateListPantallas" />
  </div>
</template>
<script>

  import Pantalla from '~/components/Inventario/Pantallas/StepperPantalla';
  import PantallaUpdate from '~/components/Inventario/Pantallas/FormPantalla';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  import Alert from '~/components/Site/SweetAlert';

  export default {
    head() {
      return {
        title: 'Pantallas'
      }
    },
    data() {
      return {
        headers: [
          { text: 'Id', value: 'id', align: ' d-none' },
          { text: 'Pulgadas', value: 'pulgadas', sortable: false },
          { text: 'Tipo', value: 'tipo', sortable: false },
          { text: 'Marca', value: 'marca.nombre', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        pantallas: [],
        page: {
          current: 1,
          last: 0,
          url: 'api/inventario/pantallas/i/10?page='
        },
        search: {
          label: 'Tipo de pantalla',
          url: 'api/inventario/pantallas/buscar/tipo/'
        },
        pantalla: null,
        isViewPantallaUpdate: false,
        isLoading: false
      }
    },
    components: {
      Pantalla,
      PantallaUpdate,
      Table,
      Pagination
    },
    async fetch() {
      const { data } = await this.$axios.$get(`api/inventario/pantallas/i/10?page=${this.page.current}`);
      this.pantallas = data.data;
      this.page.last = data.last_page;
      this.page.url = 'api/inventario/pantallas/i/10?page=';
    },
    methods: {
      updateListPantallas(pantallas) {
        this.pantallas = pantallas.data;
        this.page.current = pantallas.current;
      },
      getPantalla(pantalla) {
        this.pantalla = pantalla;
        this.isViewPantallaUpdate = true;
      },
      updatePantalla(pantalla) {
        Alert.showConfirm('Actualizar Pantalla', '¿Esta seguro de realizar la petición?', 'question', async(confirmed) => {
          if (confirmed) {
            try {
              this.isLoading = true;
              const { descripcion } = await this.$axios.$put(`api/inventario/pantallas/${this.pantalla.id}`, pantalla);
              setTimeout(() => {
                Alert.showToast('success', descripcion);
                this.isLoading = false;
                this.isViewPantallaUpdate = false;
                this.$fetch();
              }, 500);
            } catch (error) {
              this.isLoading = false;
            }
          }
        });
      },
      searchListPantallas(pantallas) {
        this.pantallas = pantallas.data.data;
        this.page.current = 1;
        this.page.last = pantallas.data.last_page;
        this.page.url = pantallas.url;
      },
    }
  }
</script>

<template>
  <div>
    <v-row
      align="center"
      justify="center">
      <v-col>
        <Pantalla :titulo="titulo" :url="url" :data="pantalla" @clearForm="clearForm" />
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
  /**
    * @module pages/inventarios/pantallas/index
  */
  import Pantalla from '~/components/Inventario/Pantallas/StepperPantalla';
  import Table from '~/components/Site/Table';
  import Pagination from '~/components/Site/Pagination';
  /**
   * @vue-data {Object} pantalla - Datos para gestionar la api del modelo.
   * @vue-data {Array} headers - Configura lo que va a mostrar la tabla.
   * @vue-data {Array} pantallas - Lista de pantallas mostrada en la tabla.
   * @vue-data {Object} page - Configura la paginacion de la tabla.
   * @vue-data {Object} search - Configura la busqueda sobre el modelo.
   * @vue-data {String} titulo - Titulo del formulario pantalla.
   * @vue-data {String} url - Url del formulario que ejecuta una petición.
   * @vue-event {Array} updateListPantallas - Actualiza la informacion sobre la tabla.
   * @vue-event {Object} getPantalla - Trae el modelo seleccionado desde la tabla.
   * @vue-event {} clearForm - Reinicia los valores sobre el modelo.
   * @vue-event {Array} searchListPantallas - Cambia los valores en la tabla cuando se esta realizando una busqueda.
  */
  export default {
    middleware: ['auth', 'isCoordinador'],
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
        isLoading: false,
        titulo: 'Nueva Pantalla',
        pantalla: {},
        url: 'api/inventario/pantallas'
      }
    },
    components: {
      Pantalla,
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
        this.titulo = 'Actualizar Pantalla';
        this.url = `api/inventario/pantallas/${this.pantalla.id}`;
      },
      searchListPantallas(pantallas) {
        this.pantallas = pantallas.data.data;
        this.page.current = 1;
        this.page.last = pantallas.data.last_page;
        this.page.url = pantallas.url;
      },
      clearForm() {
        this.titulo = 'Nueva Pantalla';
        this.url = 'api/inventario/pantallas';
        this.pantalla = {};
        this.$fetch();
      }
    }
  }
</script>
